import mongoose from "mongoose";

import { Company } from "@db/restAPIConnection/schemas/Company";
import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { User } from "@db/restAPIConnection/schemas/User";

import { getCompanyUserPermissions } from "@contexts/company/actions";
import type { APIResponse } from "@contexts/shared/types";

import send from "@services/email";

type InviteWorkersProps = {
  companyId: string;
  invitations: { emails?: string[]; users?: string[] };
  userId: string;
};

export default async ({
  companyId,
  invitations: { emails, users },
  userId,
}: InviteWorkersProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.people?.workers.add) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to invite a worker",
      };
    }

    if (!emails?.length && !users?.length) {
      throw { status: 422, error: "No invitations to send" };
    }

    const now = new Date();

    if (emails?.length) {
      const userInvitations = await User.find({ email: { $in: emails } });

      await Promise.all(
        emails.map(async (email) => {
          const invited = userInvitations.find(
            ({ email: userEmail }) => email === userEmail
          );

          if (invited) {
            await send({
              email,
              type: "existingUserInvitedToCompany",
              companyName: company.name,
            });

            await company.workers.push({
              _id: new mongoose.Types.ObjectId(),
              userId: invited._id,
              roleId: undefined,
              status: "pending",
              joined: now,
            });

            await company.save();
          } else {
            await send({
              email: email.toLowerCase(),
              type: "newUserInvitedToCompany",
              companyName: company.name,
            });

            await company.workers.push({
              _id: new mongoose.Types.ObjectId(),
              email: email.toLowerCase(),
              roleId: undefined,
              status: "pending",
              joined: now,
            });

            await company.save();
          }

          await Invitation.create({
            to: {
              userId: invited?._id,
              email,
            },
            from: {
              userId,
              companyId: company._id,
            },
          });
        })
      );
    }

    if (users?.length) {
      const userInvitations = await User.find({ _id: { $in: users } });

      await Promise.all(
        userInvitations.map(async ({ _id, email }) => {
          await send({
            email,
            type: "existingUserInvitedToCompany",
            companyName: company.name,
          });

          await company.workers.push({
            _id: new mongoose.Types.ObjectId(),
            userId: _id,
            roleId: undefined,
            status: "pending",
            joined: now,
          });

          await company.save();

          await Invitation.create({
            to: {
              userId: _id,
              email,
            },
            from: {
              userId,
              companyId: company._id,
            },
          });
        })
      );
    }

    return { status: 201, message: "Invitations successfully sent" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error inviting these workers",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
