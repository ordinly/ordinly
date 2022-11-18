import { Company } from "@db/restAPIConnection/schemas/Company";
import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { Project } from "@db/restAPIConnection/schemas/Project";

import { getProjectCompanyPermissions } from "@contexts/projects/actions";

import send from "@services/email";

import type { UserDocument } from "@db/restAPIConnection/schemas/User";

import type { APIResponse } from "@contexts/shared/types";

type InviteCompanyToCompanyProjectProps = {
  user: UserDocument;
  companyId: string;
  projectId: string;
  invitations: {
    companyId: string;
    permissions: {
      companies: {
        add: boolean;
        edit: boolean;
        remove: boolean;
        view: boolean;
      };
      tasks: {
        add: boolean;
        assigned: {
          edit: boolean;
          remove: boolean;
        };
        nonAssigned: {
          view: boolean;
          edit: boolean;
          remove: boolean;
        };
      };
    };
  }[];
};

export default async ({
  user,
  companyId,
  projectId,
  invitations,
}: InviteCompanyToCompanyProjectProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw {
        status: 404,
        error: "Company not found",
      };
    }

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

    if (!companyPermissions.companies.add) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to invite companies to this project",
      };
    }

    const invited = await Company.find({
      _id: { $in: invitations.map(({ companyId }) => companyId) },
    });

    if (!invited) {
      throw {
        status: 500,
        error: "There was an error inviting these companies",
      };
    }

    if (invited?.length !== invitations.length) {
      throw {
        status: 500,
        error: "There was an error inviting some of these companies",
      };
    }

    invited.forEach(async ({ _id, name, emailAddress }) => {
      const invitation = invitations.find(
        ({ companyId }) => companyId === _id.toString()
      );

      if (emailAddress) {
        await send({
          email: emailAddress,
          type: "companyInvitedToCompanyProject",
          userName: user.name,
          toCompanyName: name,
          fromCompanyName: company.name,
        });
      }

      Invitation.create({
        to: {
          companyId: _id,
        },
        from: {
          userId: user._id,
          companyId,
          projectId,
          permissions: invitation?.permissions,
        },
      });
    });

    await company.save();

    return { status: 201, message: "Invitations to companies sent" };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error inviting these companies",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
