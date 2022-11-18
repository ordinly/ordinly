import Stripe from "stripe";

import { config } from "dotenv";

import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { Company } from "@db/restAPIConnection/schemas/Company";
import { User } from "@db/restAPIConnection/schemas/User";

import send from "@services/email";

export type AcceptInvitationProps = {
  user: any;
  invitationId: string;
};

config();

const STRIPE_SECRET_API_KEY: string =
  process.env["STRIPE_SECRET_API_KEY"] || "";

//@ts-ignore - options are not actually mandatory via StripeConfig docs
const stripe = new Stripe(STRIPE_SECRET_API_KEY);

export default async ({ user, invitationId }: AcceptInvitationProps) => {
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

    if (company.subscription?.subscriptionId) {
      const subscriptionId = company.subscription?.subscriptionId as string;

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      await stripe.subscriptionItems.update(subscription.items.data[0].id, {
        quantity: (subscription.items.data[0]?.quantity || 0) + 1,
      });
    }

    invitation.accepted = true;

    const worker = company.workers.find(
      ({ userId, email }) =>
        userId?.toString() === user._id.toString() ||
        email?.toLowerCase() === user.email
    );

    if (!worker) {
      throw { status: 404, error: "Worker not found" };
    }

    worker.email = undefined;
    worker.userId = user._id.toString();
    worker.status = "active";

    const from = await User.findOne({ _id: invitation.from.userId });

    if (from) {
      await send({
        email: from.email,
        type: "acceptedInvitationToCompany",
        companyName: company.name,
        userName: user.name,
      });
    }

    await company.save();

    await invitation.save();

    return { status: 200, message: "Invitation accepted" };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "We weren't able to respond to this invitation",
    } = caught;

    throw { status: status, error: error };
  }
};
