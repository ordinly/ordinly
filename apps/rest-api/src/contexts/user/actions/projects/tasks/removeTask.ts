import { Project } from "@db/restAPIConnection/schemas/Project";
import { Task } from "@db/restAPIConnection/schemas/Task";

import type { APIResponse } from "@contexts/shared/types";

type RemoveTaskProps = {
  taskId: string;
  userId: string;
  projectId: string;
};

export default async ({
  taskId,
  projectId,
  userId,
}: RemoveTaskProps): APIResponse => {
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

    task.deletedAt = new Date();
    task.deletedBy = userId;

    await task.save();

    return { status: 200, message: "Task removed" };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error removing this task",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
