import mongoose from "mongoose";

import { Document } from "@db/restAPIConnection/schemas/Document";

import type { QuoteDocument, QuoteModel } from "./types";

const { Schema } = mongoose;

const quoteSchema = new Schema<QuoteDocument>({
  isEstimate: Boolean,
  client: String,
  quoteNumber: String,
  quoteDate: Date,
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

//@ts-ignore
export default Document.discriminator<QuoteDocument, QuoteModel>(
  "Quote",
  quoteSchema
);
