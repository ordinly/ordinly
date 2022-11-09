import mongoose from "mongoose";

import { Document } from "@db/restAPIConnection/schemas/Document";

import type { InvoiceDocument, InvoiceModel } from "./types";

const { Schema } = mongoose;

const invoiceSchema = new Schema<InvoiceDocument>({
  client: String,
  invoiceNumber: String,
  issueDate: Date,
  dueDate: Date,
  taxRate: String,
  address: {
    country: String,
    region: String,
    city: String,
    postalCode: String,
    streetAddress: String,
  },
  items: [
    {
      description: String,
      price: Number,
      quantity: Number,
      additionalNotes: String,
    },
  ],
});

export default Document.discriminator<InvoiceDocument, InvoiceModel>(
  "Invoice",
  invoiceSchema
);
