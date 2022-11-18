import { Invitation } from "@db/restAPIConnection/schemas/Invitation";

import type { APIResponse } from "@contexts/shared/types";

type UpdateInvitationToPersonalProjectProps = {
  invitationId: string;
  permissions: any;
};

export default async ({
  invitationId,
  permissions,
}: UpdateInvitationToPersonalProjectProps): APIResponse => {
  try {
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
