import { Project } from "@db/restAPIConnection/schemas/Project";
import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { Company } from "@db/restAPIConnection/schemas/Company";
import { User } from "@db/restAPIConnection/schemas/User";

import send from "@services/email";

import { getProjectCompanyPermissions } from "@contexts/projects/actions";

import type { UserDocument } from "@db/restAPIConnection/schemas/User";

import type { APIResponse } from "@contexts/shared/types";

type RevokeInvitationToCompanyProjectProps = {
  invitationId: string;
  user: UserDocument;
  companyId: string;
  projectId: string;
};

export default async ({
  invitationId,
  companyId,
  user,
  projectId,
}: RevokeInvitationToCompanyProjectProps): APIResponse => {
  try {
    const project = await Project.findOne({ _id: projectId });

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

    const invitation = await Invitation.findOne({ _id: invitationId });

    if (!invitation) {
      throw {
        status: 404,
        error: "Invitation not found",
      };
    }

    invitation.revoked = true;

    const company = await Company.findOne({ _id: invitation.to.companyId });

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

    await invitation.save();

    return { status: 200, message: "Invitation revoked" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error revoking this invitation",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
