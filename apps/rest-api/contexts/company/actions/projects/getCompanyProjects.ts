import mongoose from "mongoose";

import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

import type { ProjectDocument } from "@db/restAPIConnection/schemas/Project";

export default async ({
  companyId,
  page = 1,
  pageSize = 15,
  searchTerm = "",
  priority,
  status,
  startDate,
  dueDate,
  clientIds,
  userId,
}: {
  userId: string;
  companyId: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  priority?: string;
  status?: string;
  startDate?: string;
  dueDate?: string;
  clientIds?: string;
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

  if (clientIds) {
    query.push({
      clientId: {
        $in: clientIds
          .split(",")
          .map((clientId) => mongoose.Types.ObjectId(clientId)),
      },
    });
  }

  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId,
    });

    if (!userPermissions?.projects?.projects?.nonAssigned?.view) {
      const workerId = company?.workers?.find(
        ({ userId: workerUserId }) =>
          workerUserId?.toString() === userId.toString()
      )?._id;

      const teamIds = company?.teams?.reduce((total, { _id, members }) => {
        if (members.includes(workerId)) {
          return [...total, _id];
        }

        return total;
      }, [] as any);

      query.push({
        $or: [
          { "tasks.assignedWorker": workerId },
          { "tasks.assignedTeam": { $in: teamIds } },
        ],
      });
    }

    const [
      {
        projects,
        info: [{ total } = { total: 0 }],
      },
    ] = await Project.aggregate([
      {
        $lookup: {
          from: "Tasks",
          localField: "tasks",
          foreignField: "_id",
          as: "tasks",
        },
      },
      {
        $match: {
          $and: [
            {
              $or: [
                { "owner.companyId": company._id },
                { "companies.companyId": company._id },
              ],
            },
            {
              $or: [{ name: { $regex: new RegExp(`${searchTerm}`, "gi") } }],
            },
            ...query,
          ],
          deletedAt: { $exists: false },
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
    console.log(caught);
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
