import PDFKit from "pdfkit";
import { s3 } from "@services/documents";

import type { InvoiceType, PDFDocument } from "./types";

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

const generateCustomerInfo = (doc: PDFDocument, invoice: InvoiceType) => {
  doc.fillColor("#444444").fontSize(20).text("Invoice", 50, 160);

  generateLine(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text(
      `Invoice Number: ${invoice.invoiceNumber}`,
      50,
      customerInformationTop
    )
    .text(
      `Invoice Date: ${formatDate(new Date(invoice.issueDate))}`,
      50,
      customerInformationTop + 15
    )
    .text(
      `Balance Due: ${formatCurrency(
        invoice.items.reduce(
          (total, { quantity, price }) => (total += quantity * price),
          0
        )
      )}`,
      50,
      customerInformationTop + 30
    );

  if (invoice) {
    doc
      .text(invoice.client, 300, customerInformationTop)
      .text(invoice.address.streetAddress, 300, customerInformationTop + 15)
      .text(
        `${invoice.address.city}, ${invoice.address.region}, ${invoice.address.country}`,
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

const generateTable = (doc: PDFDocument, invoice: InvoiceType) => {
  let invoiceTableTop = 330;

  generateTableHeader(doc, invoiceTableTop);

  generateLine(doc, invoiceTableTop + 20);

  doc.font("Helvetica");

  let rowOffset = 30;

  for (let i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];

    const rowHeight =
      30 + item.additionalNotes
        ? doc.heightOfString(item.additionalNotes, {
            width: doc.page.width - 140,
          })
        : 30;

    let position = invoiceTableTop + rowOffset;

    if (position + rowHeight >= doc.page.height - 100) {
      doc.addPage();

      invoiceTableTop = 50;

      rowOffset = 30;

      generateTableHeader(doc, invoiceTableTop);

      generateLine(doc, invoiceTableTop + 20);

      position = invoiceTableTop + rowOffset;
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

  let position = invoiceTableTop + rowOffset;

  const subtotal = invoice.items.reduce(
    (total, { quantity, price }) => (total += Number(quantity) * Number(price)),
    0
  );

  const tax = invoice.taxRate ? (Number(invoice.taxRate) / 100) * subtotal : 0;

  if (tax) {
    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("Subtotal", 370, position, {
        width: 90,
        align: "right",
      })
      .text(formatCurrency(subtotal), 0, position, { align: "right" });

    position += 30;

    doc
      .fontSize(10)
      .font("Helvetica-Bold")
      .text("Tax", 370, position, {
        width: 90,
        align: "right",
      })
      .text(formatCurrency(tax), 0, position, { align: "right" });

    position += 30;
  }

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text("Total", 370, position, {
      width: 90,
      align: "right",
    })
    .text(formatCurrency(subtotal + tax), 0, position, {
      align: "right",
    });
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

export const generateInvoice = async ({
  invoice,
  company,
}: {
  invoice: InvoiceType;
  company: CompanyDocument;
}) => {
  try {
    let doc = new PDFKit({ size: "A4", margin: 50 });

    await generateHeader(doc, company);
    await generateCustomerInfo(doc, invoice);
    await generateTable(doc, invoice);
    //generateFooter(doc);

    doc.end();

    const record = await s3
      .upload({
        Key: `/${company?._id}/${invoice.invoiceNumber}.pdf`,
        Body: doc,
        Bucket: "invoices",
        ContentType: "application/pdf",
      })
      .promise();

    return record;
  } catch (caught: any) {
    console.error(caught);
  }
};
