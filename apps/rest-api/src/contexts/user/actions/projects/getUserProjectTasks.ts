import { Types } from "mongoose";

import { Project } from "@db/restAPIConnection/schemas/Project";
import { Task } from "@db/restAPIConnection/schemas/Task";

import type { TaskDocument } from "@db/restAPIConnection/schemas/Task";
import type { APIResponse } from "@contexts/shared/types";

export default async ({
  projectId,
  page = 1,
  pageSize = 15,
  searchTerm = "",
  priority,
  status,
  startDate,
  dueDate,
}: {
  userId?: string;
  projectId: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  priority?: string;
  status?: string;
  startDate?: string;
  dueDate?: string;
}): APIResponse<{
  tasks: [];
  total: number;
}> => {
  try {
    const query = [];

    if (priority) {
      query.push({ priority: { $in: priority.split(",") } });
    }

    if (status) {
      query.push({ status: { $in: status.split(",") } });
    }

    if (startDate) {
      query.push({ startDate: { $gt: new Date(startDate) } });
    }

    if (dueDate) {
      query.push({ dueDate: { $lt: new Date(dueDate) } });
    }

    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      throw { status: 404, error: "Project not found" };
    }

    const [
      {
        tasks,
        info: [{ total } = { total: 0 }],
      },
    ] = await Task.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                {
                  _id: {
                    $in: project.tasks.map((_id) => new Types.ObjectId(_id)),
                  },
                },
                {
                  projectId: project._id.toString(),
                },
              ],
            },
            {
              $and: [
                {
                  $or: [
                    { name: { $regex: new RegExp(`${searchTerm}`, "gi") } },
                  ],
                },
                ...query,
              ],
            },
            { deletedAt: { $exists: false } },
          ],
        },
      },
      {
        $facet: {
          tasks: [
            { $skip: (Number(page) - 1) * Number(pageSize) },
            { $limit: Number(pageSize) },
          ],
          info: [{ $count: "total" }],
        },
      },
    ]);

    return {
      status: 200,
      message: "Tasks fetched",
      tasks: tasks.map(
        ({
          _id,
          name,
          description,
          priority,
          status,
          startDate,
          dueDate,
        }: TaskDocument) => ({
          _id,
          name,
          description: description ? JSON.parse(description) : undefined,
          priority,
          status,
          startDate,
          dueDate,
        })
      ),
      total,
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error fetching these tasks",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
