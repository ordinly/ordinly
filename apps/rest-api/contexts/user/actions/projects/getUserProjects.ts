import { Project } from "@db/restAPIConnection/schemas/Project";

import type { APIResponse } from "@contexts/shared/types";

import type { ProjectDocument } from "@db/restAPIConnection/schemas/Project";

export default async ({
  userId,
  page = 1,
  pageSize = 15,
  searchTerm = "",
  priority,
  status,
  startDate,
  dueDate,
}: {
  userId: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  priority?: string;
  status?: string;
  startDate?: string;
  dueDate?: string;
}): APIResponse<{
  projects: {
    name: string;
    description?: string;
    _id?: string;
    companies?: string[];
    owner: { userId: string };
  }[];
  total: number;
}> => {
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

  try {
    const [
      {
        projects,
        info: [{ total } = { total: 0 }],
      },
    ] = await Project.aggregate([
      {
        $match: {
          "owner.userId": userId.toString(),
          $and: [
            {
              $or: [{ name: { $regex: new RegExp(`${searchTerm}`, "gi") } }],
            },
            ...query,
          ],
          deletedAt: { $exists: false },
        },
      },
      {
        $lookup: {
          from: "Tasks",
          localField: "tasks",
          foreignField: "_id",
          as: "tasks",
        },
      },
      {
        $facet: {
          projects: [
            { $skip: (Number(page) - 1) * Number(pageSize) },
            { $limit: Number(pageSize) },
          ],
          info: [{ $count: "total" }],
        },
      },
    ]);

    return {
      status: 200,
      message: "Projects fetched",
      projects: [
        ...projects?.map(
          ({
            name,
            description,
            _id,
            companies,
            owner,
            status,
            startDate,
            dueDate,
            priority,
            tasks,
          }: ProjectDocument) => ({
            name,
            description: description ? JSON.parse(description) : undefined,
            _id,
            companies: companies.map(({ companyId }: any) => companyId),
            owner: owner as { userId: string },
            status,
            startDate,
            dueDate,
            priority,
            tasks: {
              total: tasks.length,
              complete: tasks.filter(({ completedDate }: any) => completedDate)
                .length,
            },
          })
        ),
      ],
      total,
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error fetching your projects",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
