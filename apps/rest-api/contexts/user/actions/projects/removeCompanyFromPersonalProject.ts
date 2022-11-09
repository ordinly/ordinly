import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";
import { User } from "@db/restAPIConnection/schemas/User";

import send from "@services/email";

import type { UserDocument } from "@db/restAPIConnection/schemas/User";

import type { APIResponse } from "@contexts/shared/types";

type RemoveCompanyFromPersonalProjectProps = {
  companyId: string;
  projectId: string;
  user: UserDocument;
};

export default async ({
  companyId,
  projectId,
  user,
}: RemoveCompanyFromPersonalProjectProps): APIResponse => {
  try {
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      throw {
        status: 404,
        error: "Project not found",
      };
    }

    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw {
        status: 404,
        error: "Company not found",
      };
    }

    const owner = await User.findOne({ _id: company.owner });

    if (owner) {
      await send({
        email: owner.email,
        type: "revokeInvitationToPersonalProject",
        userName: user.name,
        companyName: company.name,
      });
    }

    project.companies = project.companies.filter(
      ({ companyId: current }) => current.toString() !== companyId
    );

    await project.save();

    return { status: 200, message: "Company removed" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error removing this company",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
