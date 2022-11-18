import { Types } from "mongoose";

import { Project } from "@db/restAPIConnection/schemas/Project";
import { File } from "@db/restAPIConnection/schemas/File";
import { Task } from "@db/restAPIConnection/schemas/Task";

import { removeSingle } from "@services/documents";

import type { APIResponse } from "@contexts/shared/types";

type AddTaskProps = {
  taskId?: string;
  userId: string;
  projectId: string;
  name: string;
  dueDate?: string;
  description?: string;
  comments: string[];
  files?: any[];
  startDate?: Date;
  priority?: string;
  status?: string;
  assignedCompany?: string;
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
  startDate,
  priority,
  status: taskStatus,
  assignedCompany,
  checklist,
  relationships,
}: AddTaskProps): APIResponse => {
  try {
    const project = await Project.findOne({
      _id: projectId,
      "owner.userId": userId,
    });

    if (!project) {
      throw { status: 404, error: "Project not found" };
    }

    const now = new Date();

    const fileIds = [];

    for (let i = 0; i < files.length; i++) {
      const { originalname, key, size, mimetype, bucket } = files[i];

      const newFile = await File.create({
        name: originalname,
        key,
        createdAt: new Date(),
        size,
        mimetype,
        createdBy: Types.ObjectId(userId),
        bucket,
      });

      if (!newFile) {
        await removeSingle({
          bucket,
          key,
        });

        throw { status: 500, error: "Error uploading file" };
      }

      fileIds.push(Types.ObjectId(newFile._id));
    }

    const task = await Task.create({
      _id: Types.ObjectId(taskId),
      projectId: Types.ObjectId(projectId),
      name,
      description: description ? JSON.stringify(description) : undefined,
      createdDate: now,
      createdBy: Types.ObjectId(userId),
      dueDate: dueDate ? new Date(dueDate) : undefined,
      comments: comments.map((comment) => ({
        userId: Types.ObjectId(userId),
        text: comment,
        createdDate: new Date(),
      })),
      assignedCompany,
      files: fileIds,
      priority,
      startDate,
      status: taskStatus,
      checklist,
      relationships: relationships?.map(({ taskId: newTaskId, ...rest }) => ({
        taskId: Types.ObjectId(newTaskId),
        ...rest,
      })),
      ...(taskStatus === "Complete" ? { completedDate: new Date() } : {}),
    });

    if (!task) {
      throw { status: 500, error: "There was an error adding this task" };
    }

    project.tasks.push(task._id);

    await project.save();

    return { status: 200, message: "Task added" };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error adding this task",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
