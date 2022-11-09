import type { Document, Model } from "mongoose";

export type DocumentType = {
  name: string;
  kind: string;
  companyId: string;
  clientId: string;
  projectId: string;
  contactId: string;
  bucket: string;
  key: string;
  contact: {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
  };
  createdBy: string;
  createdAt: Date;
  deletedAt: Date;
  deletedBy: string;
};

export interface DocumentDocument extends Document, DocumentType {}

export interface DocumentModel extends Model<DocumentDocument> {}
