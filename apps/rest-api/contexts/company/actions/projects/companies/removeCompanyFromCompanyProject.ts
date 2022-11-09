import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";
import { User } from "@db/restAPIConnection/schemas/User";

import send from "@services/email";

import { getProjectCompanyPermissions } from "@contexts/projects/actions";

import type { UserDocument } from "@db/restAPIConnection/schemas/User";

import type { APIResponse } from "@contexts/shared/types";

type RemoveCompanyFromCompanyProjectProps = {
  companyId: string;
  projectId: string;
  user: UserDocument;
  invitedCompanyId: string;
};

export default async ({
  companyId,
  projectId,
  invitedCompanyId,
  user,
}: RemoveCompanyFromCompanyProjectProps): APIResponse => {
  try {
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      throw {
        status: 404,
        error: "Project not found",
      };
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

    if (!companyPermissions.companies.remove) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to remove this company from this project",
      };
    }

    const company = await Company.findOne({ _id: invitedCompanyId });

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
        type: "revokeInvitationToCompanyProject",
        userName: user.name,
        companyName: company.name,
      });
    }

    project.companies = project.companies.filter(
      ({ companyId: current }) => current.toString() !== invitedCompanyId
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
