import { Types } from "mongoose";

import { Project } from "@db/restAPIConnection/schemas/Project";
import { Task } from "@db/restAPIConnection/schemas/Task";

import type { APIResponse } from "@contexts/shared/types";

export default async ({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}): APIResponse<{
  tasks: any[];
}> => {
  try {
    const project = await Project.findOne({
      _id: projectId,
      "owner.userId": userId,
      deletedAt: { $exists: false },
    });

    if (!project) {
      throw { status: 404, error: "Project not found" };
    }

    const tasks = await Task.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                {
                  _id: {
                    $in: project.tasks.map(
                      (_id: any) => new Types.ObjectId(_id)
                    ),
                  },
                },
                {
                  projectId: project._id.toString(),
                },
              ],
            },
            { deletedAt: { $exists: false } },
          ],
        },
      },
      {
        $group: {
          _id: { status: "$status" },
          count: { $sum: 1 },
        },
      },
    ]);

    console.log(tasks);

    return {
      status: 200,
      message: "Task analytics fetched",
      tasks,
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error fetching your task analytics",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
