import { Project } from "@db/restAPIConnection/schemas/Project";
import { Task } from "@db/restAPIConnection/schemas/Task";

import type { APIResponse } from "@contexts/shared/types";

type AddCommentProps = {
  userId: string;
  projectId: string;
  taskId: string;
  text: string;
};

export default async ({
  projectId,
  taskId,
  userId,
  text,
}: AddCommentProps): APIResponse => {
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

    task.comments.push({
      text,
      userId,
      createdDate: new Date(),
    });

    task.save();

    return { status: 200, message: "Comment added" };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error adding this comment",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
