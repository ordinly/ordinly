import type { Types } from "mongoose";

export type Comment = {
  userId: string;
  text: string;
  createdDate: Date;
  updatedDate?: Date;
  deletedDate?: Date;
};

export type FileType = {
  name: string;
  key: string;
};

export type TaskType = {
  name: string;
  description?: string;
  assignedCompany?: Types.ObjectId;
  assignedTeam?: Types.ObjectId;
  assignedWorker?: Types.ObjectId;
  relationships: { taskId: any; variant: string }[];
  createdDate: Date;
  createdBy: { userId: string; companyId: string };
  dueDate?: Date;
  startDate?: Date;
  completedDate?: Date;
  completedBy?: string;
  deletedAt?: Date;
  deletedBy?: string;
  comments: Comment[];
  status?: string;
  priority?: string;
  files: string[];
  checklist?: { name: string; complete: boolean }[];
};
