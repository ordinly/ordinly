import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { Company } from "@db/restAPIConnection/schemas/Company";
import { User } from "@db/restAPIConnection/schemas/User";

import send from "@services/email";

export type DeclineInvitationProps = {
  user: any;
  invitationId: string;
};

export default async ({ user, invitationId }: DeclineInvitationProps) => {
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

    invitation.accepted = false;

    const from = await User.findOne({ _id: invitation.from.userId });

    if (from) {
      await send({
        email: from.email,
        type: "declinedInvitationToCompany",
        companyName: company.name,
        userName: user.name,
      });
    }

    company.workers = company.workers.filter(
      ({ userId }) => userId?.toString() !== user._id.toString()
    );

    await company.save();

    await invitation.save();

    return { status: 200, message: "Invitation declined" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "We weren't able to respond to this invitation",
    } = caught;

    throw { status: status, error: error };
  }
};
