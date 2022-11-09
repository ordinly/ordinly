import { Project } from "@db/restAPIConnection/schemas/Project";
import { File } from "@db/restAPIConnection/schemas/File";
import { Task } from "@db/restAPIConnection/schemas/Task";

import { removeSingle } from "@services/documents";

import type { APIResponse } from "@contexts/shared/types";

type AddFileToTaskProps = {
  projectId: string;
  taskId: string;
  userId: string;
  name: string;
  key: string;
  size: number;
  mimetype: string;
  bucket: string;
};

export default async ({
  projectId,
  taskId,
  userId,
  name,
  key,
  size,
  mimetype,
  bucket,
}: AddFileToTaskProps): APIResponse => {
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

    const newFile = await File.create({
      name,
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

    const { _id } = newFile;

    task.files.push(_id);

    task.save();

    return { status: 200, message: "File added to task" };
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
