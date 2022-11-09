import mongoose from "mongoose";

import restAPIConnection from "@db/restAPIConnection";

import type { DocumentDocument, DocumentModel } from "./types";

const { Schema } = mongoose;

const documentSchema = new Schema<DocumentDocument>(
  {
    name: String,
    companyId: String,
    clientId: String,
    projectId: String,
    contactId: String,
    bucket: String,
    key: String,
    contact: {
      name: String,
      email: String,
      phoneNumber: String,
    },
    createdBy: String,
    createdAt: Date,
    deletedAt: Date,
    deletedBy: String,
  },
  { collection: "Documents", discriminatorKey: "kind" }
);

restAPIConnection.model("Document", documentSchema);

export default restAPIConnection.model<DocumentDocument, DocumentModel>(
  "Document"
);
