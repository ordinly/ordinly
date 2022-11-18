import { config } from "dotenv";

import { Project } from "@db/restAPIConnection/schemas/Project";

import type { APIResponse } from "@contexts/shared/types";

type DeleteProjectProps = {
  projectId: string;
  userId: string;
};

config();

export default async ({
  projectId,
  userId,
}: DeleteProjectProps): APIResponse => {
  console.log(projectId, userId);
  try {
    const project = await Project.findOne({
      _id: projectId,
      "owner.userId": userId,
    });

    if (!project) {
      throw { status: 404, error: "Project not found" };
    }

    project.deletedBy = userId;
    project.deletedAt = new Date();

    await project.save();
    return { status: 200, message: "Project deleted" };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error deleting this project",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
