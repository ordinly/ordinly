import mongoose from "mongoose";

import restAPIConnection from "@db/restAPIConnection";

import type { Document, Model } from "mongoose";

import type { TaskType } from "./types";

const { Schema } = mongoose;

export interface TaskDocument extends Document, TaskType {}

interface TaskModel extends Model<TaskDocument> {}

const commentSchema = new Schema();

commentSchema.add({
  userId: mongoose.Schema.Types.ObjectId,
  companyId: mongoose.Schema.Types.ObjectId,
  text: String,
  createdDate: Date,
  updatedDate: Date,
  deletedDate: Date,
  replies: [commentSchema],
});

const taskSchema = new Schema<TaskDocument>(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: String,
    assignedCompany: mongoose.Schema.Types.ObjectId,
    assignedTeam: mongoose.Schema.Types.ObjectId,
    assignedWorker: mongoose.Schema.Types.ObjectId,
    relationships: [
      { taskId: mongoose.Schema.Types.ObjectId, variant: String },
    ],
    status: String,
    priority: String,
    startDate: Date,
    dueDate: Date,
    completedDate: Date,
    completedBy: String,
    deletedBy: String,
    deletedAt: Date,
    comments: [commentSchema],
    files: [String],
    checklist: [{ name: String, complete: Boolean }],
  },
  { collection: "Tasks", timestamps: true }
);

restAPIConnection.model("Task", taskSchema);

export default restAPIConnection.model<TaskDocument, TaskModel>("Task");
