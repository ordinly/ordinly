import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { User } from "@db/restAPIConnection/schemas/User";

import type { CompanyDocument } from "@db/restAPIConnection/schemas/Company";

import type { InvitationType, UserType } from "./types";

export default async ({
  company,
  workers,
}: {
  company: CompanyDocument;
  workers: UserType[];
}): Promise<InvitationType[]> => {
  let invitations: InvitationType[] = [];

  const invitationDocs = await Invitation.find({
    "from.companyId": company._id,
    revoked: { $exists: false },
    accepted: { $exists: false },
  });

  if (invitationDocs?.length) {
    invitations = await invitationDocs.reduce(
      async (
        total,
        { _id, from: { userId: fromUserId }, to: { email: toEmail, roleId } }
      ) => {
        const fromUser =
          workers.find(
            ({ _id: workerUserId }) => workerUserId === fromUserId.toString()
          ) ||
          (await User.findOne(
            { _id: fromUserId },
            { name: 1, email: 1, phone: 1 }
          ));

        if (fromUser) {
          const { _id: fromUserId, name, email, phone } = fromUser;

          const status =
            "status" in fromUser ? fromUser.status : "No longer with company";

          return total.then((newInvitations) => [
            ...newInvitations,
            {
              _id,
              from: {
                user: {
                  _id: fromUserId.toString(),
                  name,
                  email,
                  phone,
                  status,
                },
              },
              to: {
                email: toEmail as string,
                roleId,
              },
            },
          ]);
        }

        return total;
      },
      Promise.resolve([] as InvitationType[])
    );
  }

  return invitations;
};
