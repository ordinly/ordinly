import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";

import type { APIResponse } from "@contexts/shared/types";

type UpdateProjectDetailsProps = {
  projectId: string;
  name: string;
  description: string;
  priority: string;
  status: string;
  startDate: Date;
  dueDate: Date;
  userId: string;
  companyId: string;
  clientId?: string;
};

export default async ({
  projectId,
  name,
  description,
  priority,
  status,
  startDate,
  dueDate,
  companyId,
  clientId,
}: UpdateProjectDetailsProps): APIResponse => {
  try {
    const company = await Company.findOne({
      _id: companyId,
    });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const client = clientId
      ? company.clients.find(({ _id }) => _id?.toString() === clientId)
      : undefined;

    if (clientId && !client) {
      throw {
        status: 404,
        error: "Client not found",
      };
    }

    const project = await Project.findOne({
      _id: projectId,
      "owner.companyId": company._id,
      deletedAt: { $exists: false },
    });

    if (!project) {
      throw { status: 404, error: "Project not found" };
    }

    project.name = name;
    project.description = description ? JSON.stringify(description) : undefined;
    project.priority = priority;
    project.status = status;
    project.startDate = startDate;
    project.dueDate = dueDate;

    const companyProject = company.projects?.find(
      ({ projectId: companyProjectId }) =>
        companyProjectId.toString() === projectId.toString()
    );

    if (companyProject) {
      companyProject.clientId = clientId;
    }

    await company.save();

    await project.save();

    return { status: 200, message: "Project details updated" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this project",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
