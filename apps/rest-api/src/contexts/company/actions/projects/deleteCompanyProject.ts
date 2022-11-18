import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";

import type { APIResponse } from "@contexts/shared/types";

type DeleteProjectProps = {
  projectId: string;
  companyId: string;
  userId: string;
};

export default async ({
  projectId,
  userId,
  companyId,
}: DeleteProjectProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const project = await Project.findOne({
      _id: projectId,
      "owner.companyId": company._id,
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
