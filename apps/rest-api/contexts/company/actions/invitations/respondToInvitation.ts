import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";

import minimumCompanyProjectPermissions from "@db/static/minimumCompanyProjectPermissions.json";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type RespondToInvitationProps = {
  companyId: string;
  invitationId: string;
  accepted: boolean;
  userId: string;
  clientId?: string;
};

export default async ({
  invitationId,
  accepted,
  companyId,
  userId,
  clientId,
}: RespondToInvitationProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.settings.invitations.edit) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to respond to this invitation",
      };
    }

    const invitation = await Invitation.findOne({ _id: invitationId });

    if (!invitation) {
      throw { status: 404, error: "Invitation not found" };
    }

    invitation.accepted = accepted;

    if (accepted) {
      if (invitation?.from?.projectId) {
        const project = await Project.findOne({
          _id: invitation?.from?.projectId,
        });

        if (!project) {
          throw { status: 404, error: "Project not found" };
        }

        if (
          !project.companies.find(
            ({ companyId: current }) => companyId === current
          )
        ) {
          project.companies.push({
            companyId,
            addedOn: new Date(),
            permissions:
              invitation.from?.permissions || minimumCompanyProjectPermissions,
            addedBy: invitation?.from?.userId
              ? invitation.from.userId.toString()
              : undefined,
            assignedWorkers: [],
            assignedTeams: [],
          });

          await project.save();
        }
      }

      if (invitation?.from?.projectId) {
        if (!company.projects) {
          company.projects = [];
        }

        company.projects.push({
          projectId: invitation?.from?.projectId,
          clientId,
        });
      }
    }

    await company.save();

    await invitation.save();

    return {
      status: 201,
      message: `Invitation ${accepted ? "accepted" : "rejected"}`,
    };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error responding to this invitation",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
