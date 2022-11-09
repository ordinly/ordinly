import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

import send from "@services/email";

type RevokeInvitationProps = {
  invitationId: string;
  userId: string;
};

export default async ({
  invitationId,
  userId,
}: RevokeInvitationProps): APIResponse => {
  try {
    const invitation = await Invitation.findOne({
      _id: invitationId,
      revoked: { $exists: false },
      accepted: { $exists: false },
    });

    if (!invitation) {
      throw { status: 404, error: "Invitation not found" };
    }

    const company = await Company.findOne({ _id: invitation.from.companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.people.workers.remove) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to revoke this invitation",
      };
    }

    await send({
      email: invitation.to.email as string,
      type: "revokedInvitationToCompany",
      companyName: company.name,
    });

    invitation.revoked = true;

    await invitation.save();

    return { status: 200, message: "Invitation successfully revoked" };
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
