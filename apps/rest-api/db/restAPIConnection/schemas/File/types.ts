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

//@ts-ignore
export interface FileDocument extends Document, FileType {}

//@ts-ignore
export interface FileModel extends Model<FileDocument> {}
