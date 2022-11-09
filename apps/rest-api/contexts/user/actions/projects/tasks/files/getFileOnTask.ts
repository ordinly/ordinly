import { Project } from "@db/restAPIConnection/schemas/Project";
import { File } from "@db/restAPIConnection/schemas/File";
import { Task } from "@db/restAPIConnection/schemas/Task";

import { getSingle } from "@services/documents";

import type { APIResponse } from "@contexts/shared/types";

type GetFileOnTask = {
  projectId: string;
  taskId: string;
  userId: string;
  fileId: string;
};

export default async ({
  projectId,
  taskId,
  fileId,
  userId,
}: GetFileOnTask): APIResponse<{ file: any }> => {
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

    const file = await File.findOne({
      _id: fileId,
    });

    if (!file) {
      throw { status: 404, error: "File not found" };
    }

    const { bucket, key } = file;

    const response = await getSingle({
      bucket,
      key,
    });

    if (!response || !response?.Body) {
      throw { status: 404, error: "File not found" };
    }

    return { status: 200, message: "File fetched", file: response.Body };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error fetching this file",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
