import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { Project } from "@db/restAPIConnection/schemas/Project";

import { getProjectCompanyPermissions } from "@contexts/projects/actions";

import type { APIResponse } from "@contexts/shared/types";

type UpdateInvitationToPersonalProjectProps = {
  invitationId: string;
  permissions: any;
  companyId: string;
  projectId: string;
};

export default async ({
  invitationId,
  permissions,
  companyId,
  projectId,
}: UpdateInvitationToPersonalProjectProps): APIResponse => {
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

    if (!companyPermissions.companies.edit) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to update this company on this project",
      };
    }

    const invitation = await Invitation.findOne({ _id: invitationId });

    if (!invitation) {
      throw {
        status: 404,
        error: "Invitation not found",
      };
    }

    invitation.from.permissions = permissions;

    await invitation.save();

    return { status: 200, message: "Invitation updated" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this invitation",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
