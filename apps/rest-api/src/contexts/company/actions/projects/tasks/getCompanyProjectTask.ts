import { Types } from "mongoose";

import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";
import { Task } from "@db/restAPIConnection/schemas/Task";
import { File } from "@db/restAPIConnection/schemas/File";

import { getProjectCompanyPermissions } from "@contexts/projects/actions";
import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

export default async ({
  projectId,
  taskId,
  companyId,
  userId,
}: {
  userId: string;
  projectId: string;
  taskId: string;
  companyId: string;
}): APIResponse<{
  task: any;
}> => {
  try {
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

    const [task] = await Task.aggregate([
      { $match: { _id: Types.ObjectId(taskId) } },
      {
        $lookup: {
          from: "Users",
          localField: "comments.userId",
          foreignField: "_id",
          pipeline: [{ $project: { _id: 1, name: 1 } }],
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

    const companyAssigned = task.assignedCompany?.toString() === companyId;

    if (!companyAssigned && !companyPermissions.tasks.nonAssigned.view) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to view this task on this project",
      };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      userId,
      company,
    });

    const workerId = company?.workers?.find(
      ({ userId: workerUserId }) =>
        workerUserId?.toString() === userId?.toString()
    )?._id;

    const teamIds = company?.teams?.reduce((total, { _id, members }) => {
      if (members.includes(workerId)) {
        if (_id) {
          return [...total, _id.toString()];
        }
      }

      return total;
    }, [] as any);

    const workerAssigned =
      task?.assignedWorker?.toString() === userId?.toString() ||
      teamIds.includes(task?.assignedTeam?.toString());

    if (
      !userPermissions?.projects?.tasks?.nonAssigned?.view &&
      !workerAssigned
    ) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to view this task on this project",
      };
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
        canEdit:
          (companyPermissions.tasks.nonAssigned.edit ||
            (companyAssigned && companyPermissions.tasks.assigned.edit)) &&
          (userPermissions?.projects?.tasks?.nonAssigned?.edit ||
            (workerAssigned &&
              userPermissions?.projects?.tasks?.assigned?.edit)),
        canRemove:
          (companyPermissions.tasks.nonAssigned.remove ||
            (companyAssigned && companyPermissions.tasks.assigned.remove)) &&
          (userPermissions?.projects?.tasks?.nonAssigned?.remove ||
            (workerAssigned &&
              userPermissions?.projects?.tasks?.assigned?.remove)),
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
