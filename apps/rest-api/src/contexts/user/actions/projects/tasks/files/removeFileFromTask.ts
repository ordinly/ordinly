import { Project } from "@db/restAPIConnection/schemas/Project";
import { File } from "@db/restAPIConnection/schemas/File";
import { Task } from "@db/restAPIConnection/schemas/Task";

import { removeSingle } from "@services/documents";

import type { APIResponse } from "@contexts/shared/types";

type RemoveFileFromTaskProps = {
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
}: RemoveFileFromTaskProps): APIResponse => {
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

    await removeSingle({
      bucket,
      key,
    });

    task.files = task.files.filter(
      (currentTaskId) => currentTaskId.toString() !== fileId
    );

    task.save();

    return { status: 200, message: "File removed from task" };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error removing this file from this task",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
