import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { Company } from "@db/restAPIConnection/schemas/Company";
import { User } from "@db/restAPIConnection/schemas/User";

import send from "@services/email";

import type { UserDocument } from "@db/restAPIConnection/schemas/User";

import type { APIResponse } from "@contexts/shared/types";

type RevokeInvitationToPersonalProjectProps = {
  invitationId: string;
  user: UserDocument;
};

export default async ({
  invitationId,
  user,
}: RevokeInvitationToPersonalProjectProps): APIResponse => {
  try {
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
