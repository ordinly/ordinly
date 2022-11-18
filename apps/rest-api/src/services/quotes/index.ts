import PDFKit from "pdfkit";
import { s3 } from "@services/documents";

import type { QuoteType, PDFDocument } from "./types";

import type { CompanyDocument } from "@db/restAPIConnection/schemas/Company/types";

const generateHeader = (doc: PDFDocument, company: CompanyDocument) => {
  doc.fillColor("#444444").fontSize(20).text(company.name, 50, 57).fontSize(10);

  if (company.address) {
    if (company.address.streetAddress) {
      doc.text(company.address.streetAddress, 200, 65, { align: "right" });
    }

    if (
      company.address.city ||
      company.address.region ||
      company.address.postalCode
    ) {
      doc.text(
        `${company.address.city}, ${company.address.region}, ${company.address.postalCode}`,
        200,
        80,
        { align: "right" }
      );
    }
  }

  doc.moveDown();
};

const generateLine = (doc: PDFDocument, y: number) => {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
};

const generateCustomerInfo = (doc: PDFDocument, quote: QuoteType) => {
  const type = quote.isEstimate ? "Estimate" : "Quote";

  doc.fillColor("#444444").fontSize(20).text(type, 50, 160);

  generateLine(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text(`${type} Number: ${quote.quoteNumber}`, 50, customerInformationTop)
    .text(
      `${type} Date: ${formatDate(new Date(quote.quoteDate))}`,
      50,
      customerInformationTop + 15
    )
    .text(
      `Estimated cost: ${formatCurrency(
        quote.items.reduce(
          (total, { quantity, price }) => (total += quantity * price),
          0
        )
      )}`,
      50,
      customerInformationTop + 30
    );

  if (quote) {
    doc
      .text(quote.client, 300, customerInformationTop)
      .text(quote.address.streetAddress, 300, customerInformationTop + 15)
      .text(
        `${quote.address.city}, ${quote.address.region}, ${quote.address.country}`,
        300,
        customerInformationTop + 30
      );
  }

  doc.moveDown();

  generateLine(doc, 252);
};

const generateTableHeader = (doc: PDFDocument, position: number) => {
  doc.font("Helvetica-Bold");

  doc
    .fontSize(10)
    .text("Description", 50, position)
    .text("Unit Cost", 280, position, {
      width: 90,
      align: "right",
    })
    .text("Quantity", 370, position, { width: 90, align: "right" })
    .text("Line Total", 0, position, { align: "right" });
};

const generateTable = (doc: PDFDocument, quote: QuoteType) => {
  let quoteTableTop = 330;

  generateTableHeader(doc, quoteTableTop);

  generateLine(doc, quoteTableTop + 20);

  doc.font("Helvetica");

  let rowOffset = 30;

  for (let i = 0; i < quote.items.length; i++) {
    const item = quote.items[i];

    const rowHeight =
      30 + item.additionalNotes
        ? doc.heightOfString(item.additionalNotes, {
            width: doc.page.width - 140,
          })
        : 30;

    let position = quoteTableTop + rowOffset;

    if (position + rowHeight >= doc.page.height - 100) {
      doc.addPage();

      quoteTableTop = 50;

      rowOffset = 30;

      generateTableHeader(doc, quoteTableTop);

      generateLine(doc, quoteTableTop + 20);

      position = quoteTableTop + rowOffset;
    }

    let total = formatCurrency(Number(item.price) * Number(item.quantity));

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(item.description, 50, position)
      .text(`${formatCurrency(Number(item.price))}`, 280, position, {
        width: 90,
        align: "right",
      })
      .text(`${item.quantity}`, 370, position, { width: 90, align: "right" })
      .text(`${total}`, 0, position, { align: "right" });

    if (item.additionalNotes) {
      doc
        .rect(50, position + 20, doc.page.width - 95, rowHeight + 30)
        .fill("#f4f4f4");

      doc.font("Helvetica-Bold").fillColor("#444444");

      doc.text("Additional notes", 60, position + 30);

      doc.font("Helvetica");

      doc.text(item.additionalNotes, 60, position + 45);

      generateLine(doc, position + 20 + rowHeight + 30);

      rowOffset += 60;
    }

    generateLine(doc, position + 20);

    rowOffset += rowHeight;
  }

  let position = quoteTableTop + rowOffset;

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text("Subtotal", 370, position, {
      width: 90,
      align: "right",
    })
    .text(
      formatCurrency(
        quote.items.reduce(
          (total, { quantity, price }) =>
            (total += Number(quantity) * Number(price)),
          0
        )
      ),
      0,
      position,
      { align: "right" }
    );
};

//const generateFooter = (doc: PDFDocument) => {};

const formatCurrency = (total: number) => {
  return `$${Number(total).toFixed(2)}`;
};

const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}/${month}/${day}`;
};

export const generateQuote = async ({
  quote,
  company,
}: {
  quote: QuoteType;
  company: CompanyDocument;
}) => {
  try {
    let doc = new PDFKit({ size: "A4", margin: 50 });

    await generateHeader(doc, company);
    await generateCustomerInfo(doc, quote);
    await generateTable(doc, quote);
    //generateFooter(doc);

    doc.end();

    const record = await s3
      .upload({
        Key: `/${company?._id}/${quote.quoteNumber}.pdf`,
        Body: doc,
        Bucket: "quotes",
        ContentType: "application/pdf",
      })
      .promise();

    return record;
  } catch (caught: any) {
    console.error(caught);
  }
};
