import mongoose from "mongoose";

import restAPIConnection from "@db/restAPIConnection";

import type { Document, Model } from "mongoose";

import type { ProjectType } from "./types";

const { Schema } = mongoose;

export interface ProjectDocument extends Document, ProjectType {}

interface ProjectModel extends Model<ProjectDocument> {}

const projectSchema = new Schema<ProjectDocument>(
  {
    name: { type: String, required: true },
    description: String,
    createdBy: Schema.Types.ObjectId,
    deletedBy: String,
    deletedAt: Date,
    owner: { userId: String, companyId: Schema.Types.ObjectId },
    companies: [
      {
        _id: String,
        companyId: Schema.Types.ObjectId,
        permissions: {
          companies: {
            add: Boolean,
            edit: Boolean,
            remove: Boolean,
          },
          tasks: {
            add: Boolean,
            assigned: {
              edit: Boolean,
              remove: Boolean,
            },
            nonAssigned: {
              view: Boolean,
              edit: Boolean,
              remove: Boolean,
            },
          },
        },
        assignedWorkers: [Schema.Types.ObjectId],
        assignedTeams: [Schema.Types.ObjectId],
        addedOn: Date,
        addedBy: { userId: String, companyId: Schema.Types.ObjectId },
      },
    ],
    status: String,
    priority: String,
    startDate: Date,
    dueDate: Date,
    tasks: [Schema.Types.ObjectId],
    documents: [
      {
        documentId: Schema.Types.ObjectId,
        allowedCompanies: [Schema.Types.ObjectId],
        allowedUsers: [Schema.Types.ObjectId],
      },
    ],
  },
  { collection: "Projects", timestamps: true }
);

//@ts-ignore
restAPIConnection.model("Project", projectSchema);

//@ts-ignore
export default restAPIConnection.model<ProjectDocument, ProjectModel>(
  "Project"
);
