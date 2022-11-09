import { Types } from "mongoose";

import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";
import { File } from "@db/restAPIConnection/schemas/File";
import { Task } from "@db/restAPIConnection/schemas/Task";

import { removeSingle } from "@services/documents";

import { getProjectCompanyPermissions } from "@contexts/projects/actions";

import type { APIResponse } from "@contexts/shared/types";

type AddCompanyProjectTaskProps = {
  taskId?: string;
  userId: string;
  companyId: string;
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
  assignedTeam?: string;
  assignedWorker?: string;
  checklist?: { name: string; complete: boolean }[];
  relationships?: { variant: string; taskId: string }[];
};

export default async ({
  taskId,
  projectId,
  userId,
  companyId,
  name,
  dueDate,
  description,
  comments,
  files = [],
  startDate,
  priority,
  status: taskStatus,
  assignedCompany,
  assignedTeam,
  assignedWorker,
  checklist,
  relationships,
}: AddCompanyProjectTaskProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw {
        status: 404,
        error: "Company not found",
      };
    }

    const project = await Project.findOne({
      _id: projectId,
      $or: [
        { "owner.companyId": company._id },
        { "companies.companyId": company._id },
      ],
      deletedAt: { $exists: false },
    });

    if (!project) {
      throw { status: 404, error: "Project not found" };
    }

    const {
      permissions: companyPermissions,
    } = await getProjectCompanyPermissions({ project, companyId });

    if (!companyPermissions) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to view this project",
      };
    }

    if (!companyPermissions.tasks.add) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to add a task to this project",
      };
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
      _id: taskId ? Types.ObjectId(taskId) : undefined,
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
      assignedCompany: assignedCompany
        ? Types.ObjectId(assignedCompany)
        : undefined,
      assignedTeam: assignedTeam ? Types.ObjectId(assignedTeam) : undefined,
      assignedWorker: assignedWorker
        ? Types.ObjectId(assignedWorker)
        : undefined,
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
