import { Types } from "mongoose";

import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";
import { Task } from "@db/restAPIConnection/schemas/Task";

import { getProjectCompanyPermissions } from "@contexts/projects/actions";
import { getCompanyUserPermissions } from "@contexts/company/actions";

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
  companyId,
  userId,
}: {
  userId: string;
  projectId: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  priority?: string;
  status?: string;
  startDate?: string;
  dueDate?: string;
  companyId: string;
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

    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw {
        status: 404,
        error: "Company not found",
      };
    }

    const project = await Project.findOne({
      _id: projectId,
      $or: [
        { "owner.companyId": company._id },
        { "companies.companyId": company._id },
      ],
      deletedAt: { $exists: false },
    });

    if (!project) {
      throw { status: 404, error: "Project not found" };
    }

    const {
      permissions: companyPermissions,
    } = await getProjectCompanyPermissions({ project, companyId });

    if (!companyPermissions) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to view this project",
      };
    }

    if (!companyPermissions.tasks.nonAssigned.view) {
      query.push({ assignedCompany: new Types.ObjectId(companyId) });
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
        $or: [{ assignedWorker: workerId }, { assignedTeam: { $in: teamIds } }],
      });
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
      tasks: tasks?.map(
        ({
          _id,
          name,
          description,
          status,
          priority,
          startDate,
          dueDate,
        }: TaskDocument) => ({
          _id,
          name,
          description: description ? JSON.parse(description) : undefined,
          status,
          priority,
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
