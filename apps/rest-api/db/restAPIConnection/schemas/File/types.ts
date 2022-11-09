import type { Document, Model } from "mongoose";

export interface FileType {
  name: string;
  bucket: string;
  key: string;
  createdAt: Date;
  deletedAt: Date;
  size: number;
  mimetype: string;
  createdBy: string;
}

export interface FileDocument extends Document, FileType {}

export interface FileModel extends Model<FileDocument> {}
