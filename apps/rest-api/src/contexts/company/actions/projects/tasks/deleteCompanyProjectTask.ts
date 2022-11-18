import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";
import { Task } from "@db/restAPIConnection/schemas/Task";

import { getProjectCompanyPermissions } from "@contexts/projects/actions";

import type { APIResponse } from "@contexts/shared/types";

type RemoveCompanyProjectTaskProps = {
  taskId: string;
  userId: string;
  projectId: string;
  companyId: string;
};

export default async ({
  taskId,
  projectId,
  userId,
  companyId,
}: RemoveCompanyProjectTaskProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
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

    let task = await Task.findOne({ _id: taskId });

    if (!task) {
      throw { status: 404, error: "Task not found" };
    }

    const companyAssigned = task.assignedCompany?.toString() === companyId;

    if (
      companyAssigned
        ? !companyPermissions.tasks.assigned.remove
        : !companyPermissions.tasks.nonAssigned.remove
    ) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to remove a task on this project",
      };
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
