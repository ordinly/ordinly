import { Company } from "@db/restAPIConnection/schemas/Company";
import { User } from "@db/restAPIConnection/schemas/User";
import { Invitation } from "@db/restAPIConnection/schemas/Invitation";

import send from "@services/email";

import type { UserDocument } from "@db/restAPIConnection/schemas/User";

import type { APIResponse } from "@contexts/shared/types";

type InviteCompaniesProps = {
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
  user: UserDocument;
};

export default async ({
  projectId,
  invitations,
  user,
}: InviteCompaniesProps): APIResponse => {
  try {
    invitations.forEach(async ({ companyId, permissions }) => {
      const invited = await Company.findOne({ _id: companyId });

      if (!invited) {
        throw {
          status: 404,
          error: "Company not found",
        };
      }

      const owner = await User.findOne({ _id: invited.owner });

      if (owner) {
        await send({
          email: owner.email,
          type: "companyInvitedToPersonalProject",
          userName: user.name,
          companyName: invited.name,
        });
      }

      Invitation.create({
        to: {
          companyId,
        },
        from: {
          userId: user._id,
          projectId,
          permissions,
        },
      });
    });

    return { status: 200, message: "Invitations to companies sent" };
  } catch (caught: any) {
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
