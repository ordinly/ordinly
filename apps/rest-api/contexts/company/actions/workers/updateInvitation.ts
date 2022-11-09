import { Types } from "mongoose";

import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type UpdateInvitationProps = {
  invitationId: string;
  roleId: string;
  userId: string;
};

export default async ({
  invitationId,
  roleId,
  userId,
}: UpdateInvitationProps): APIResponse => {
  try {
    const invitation = await Invitation.findOne({ _id: invitationId });

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

    if (!userPermissions?.people.workers.edit) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to update this invitation",
      };
    }

    //@ts-ignore
    invitation.to.roleId = new Types.ObjectId(roleId);

    invitation.save();

    return { status: 200, message: "Invitation successfully updated" };
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
