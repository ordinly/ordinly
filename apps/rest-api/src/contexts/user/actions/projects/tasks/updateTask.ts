import { Types } from "mongoose";

import { Project } from "@db/restAPIConnection/schemas/Project";
import { File } from "@db/restAPIConnection/schemas/File";
import { Task } from "@db/restAPIConnection/schemas/Task";

import { removeSingle } from "@services/documents";

import type { APIResponse } from "@contexts/shared/types";

type UpdateTaskProps = {
  taskId: string;
  userId: string;
  projectId: string;
  name: string;
  dueDate?: string;
  description?: string;
  comments: any[];
  files?: any[];
  existingFiles?: any[];
  startDate: Date;
  priority: string;
  status: string;
  assignedCompany: string;
  checklist?: { name: string; complete: boolean }[];
  relationships?: { variant: string; taskId: string }[];
};

export default async ({
  taskId,
  projectId,
  userId,
  name,
  dueDate,
  description,
  comments,
  files = [],
  existingFiles,
  startDate,
  priority,
  status: taskStatus,
  assignedCompany,
  checklist,
  relationships,
}: UpdateTaskProps): APIResponse => {
  try {
    const project = await Project.findOne({
      _id: projectId,
      "owner.userId": userId,
    });

    if (!project) {
      throw { status: 404, error: "Project not found" };
    }

    let task = await Task.findOne({ _id: taskId });

    if (!task) {
      throw { status: 404, error: "Task not found" };
    }

    const fileIds = existingFiles?.map(({ _id }) => _id) || [];

    for (let i = 0; i < files.length; i++) {
      const { originalname, key, size, mimetype, bucket } = files[i];

      const newFile = await File.create({
        name: originalname,
        key,
        createdAt: new Date(),
        size,
        mimetype,
        createdBy: userId,
        bucket,
      });

      if (!newFile) {
        await removeSingle({
          bucket,
          key,
        });

        throw { status: 500, error: "Error uploading file" };
      }

      fileIds.push(newFile._id);
    }

    const filesToRemove = task.files.filter(
      (_id) => !fileIds.includes(_id.toString())
    );

    for (let i = 0; i < filesToRemove.length; i++) {
      const current = await File.findOne({ _id: filesToRemove[i] });

      if (current) {
        const { bucket, key } = current;

        await removeSingle({
          bucket,
          key,
        });
      }
    }

    task.name = name;
    task.description = description ? JSON.stringify(description) : undefined;
    task.dueDate = dueDate ? new Date(dueDate) : undefined;
    task.files = fileIds;
    task.priority = priority;
    task.startDate = startDate;
    task.status = taskStatus;

    task.comments = comments.map((value) =>
      value._id
        ? value
        : {
            ...value,
            userId: Types.ObjectId(userId),
            createdDate: new Date(),
          }
    );

    const newAssignedCompanyId = assignedCompany
      ? Types.ObjectId(assignedCompany)
      : undefined;

    if (task.assignedCompany !== newAssignedCompanyId) {
      task.assignedTeam = undefined;
      task.assignedWorker = undefined;
    }

    task.assignedCompany = newAssignedCompanyId;

    task.checklist = checklist;
    task.relationships =
      relationships?.map(({ taskId: newTaskId, ...rest }) => ({
        taskId: Types.ObjectId(newTaskId),
        ...rest,
      })) ?? [];

    if (taskStatus === "Complete") {
      task.completedDate = new Date();
    } else if (taskStatus !== "Complete" && task.completedDate) {
      task.completedDate = undefined;
    }

    await task.save();

    return { status: 200, message: "Task updated" };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error updating this task",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
