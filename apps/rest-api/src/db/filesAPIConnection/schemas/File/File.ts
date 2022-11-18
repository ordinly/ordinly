import mongoose from "mongoose";

import filesAPIConnection from "@db/filesAPIConnection";

import type { FileDocument, FileModel } from "./types";

const { Schema } = mongoose;

const fileSchema = new Schema<FileDocument>(
  {
    name: String,
    bucket: String,
    key: String,
    createdAt: Date,
    deletedAt: Date,
    size: Number,
    mimetype: String,
    createdBy: String,
  },
  { collection: "Files" }
);

filesAPIConnection.model("File", fileSchema);

export default filesAPIConnection.model<FileDocument, FileModel>("File");
