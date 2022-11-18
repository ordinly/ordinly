import type { Document, Model } from "mongoose";

import type { DocumentType } from "@db/restAPIConnection/schemas/Document";

export type QuoteType = DocumentType & {
  isEstimate: boolean;
  client: string;
  quoteNumber: string;
  quoteDate: Date;
  address: {
    country: string;
    region: string;
    city: string;
    postalCode: string;
    streetAddress: string;
  };
  items: {
    description: string;
    quantity: number;
    price: number;
    additionalNotes: string;
  }[];
};

export interface QuoteDocument extends Document, QuoteType {}

export interface QuoteModel extends Model<QuoteDocument> {}
