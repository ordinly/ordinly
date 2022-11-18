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
};

export default async ({
  projectId,
  name,
  description,
  userId,
  priority,
  status,
  startDate,
  dueDate,
}: UpdateProjectDetailsProps): APIResponse => {
  try {
    const project = await Project.findOne({
      _id: projectId,
      "owner.userId": userId,
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
