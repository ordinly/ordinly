import type { Document, Model } from "mongoose";

import type { DocumentType } from "@db/restAPIConnection/schemas/Document/";

export type InvoiceType = DocumentType & {
  client: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  taxRate?: number;
  contact?: {
    name: string;
    email?: string;
    phoneNumber?: string;
  };
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

//@ts-ignore
export interface InvoiceDocument extends Document, InvoiceType {}

//@ts-ignore
export interface InvoiceModel extends Model<InvoiceDocument> {}
