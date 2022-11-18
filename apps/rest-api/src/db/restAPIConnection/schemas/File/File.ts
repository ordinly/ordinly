import mongoose from "mongoose";

import restAPIConnection from "@db/restAPIConnection";

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

restAPIConnection.model("File", fileSchema);

export default restAPIConnection.model<FileDocument, FileModel>("File");
