import { Types } from "mongoose";

import { Project } from "@db/restAPIConnection/schemas/Project";
import { Task } from "@db/restAPIConnection/schemas/Task";
import { File } from "@db/restAPIConnection/schemas/File";

import type { APIResponse } from "@contexts/shared/types";

export default async ({
  projectId,
  taskId,
}: {
  userId?: string;
  projectId: string;
  taskId: string;
}): APIResponse<{
  task: any;
}> => {
  try {
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      throw { status: 404, error: "Project not found" };
    }

    const [task] = await Task.aggregate([
      { $match: { _id: Types.ObjectId(taskId) } },
      {
        $lookup: {
          from: "Users",
          localField: "comments.userId",
          foreignField: "_id",
          as: "users",
        },
      },
      {
        $addFields: {
          comments: {
            $map: {
              input: "$comments",
              in: {
                $mergeObjects: [
                  "$$this",
                  {
                    user: {
                      $arrayElemAt: [
                        "$users",
                        {
                          $indexOfArray: ["$users._id", "$$this.userId"],
                        },
                      ],
                    },
                  },
                ],
              },
            },
          },
        },
      },
      { $project: { users: 0 } },
    ]);

    if (!task) {
      throw { status: 404, error: "Task not found" };
    }

    const files = await File.find(
      { _id: { $in: task.files ?? [] } },
      { _id: 1, name: 1, key: 1, createdAt: 1 }
    );

    return {
      status: 200,
      message: "Task fetched",
      task: {
        ...task,
        description: task.description
          ? JSON.parse(task.description)
          : undefined,
        files,
      },
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error fetching this task",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
