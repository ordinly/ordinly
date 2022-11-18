import Stripe from "stripe";

import { config } from "dotenv";

import { Company } from "@db/restAPIConnection/schemas/Company";
import { User } from "@db/restAPIConnection/schemas/User";

import type { APIResponse } from "@contexts/shared/types";

import send from "@services/email";

type LeaveCompanyProps = {
  companyId: string;
  userId: string;
};

config();

const STRIPE_SECRET_API_KEY: string =
  process.env["STRIPE_SECRET_API_KEY"] || "";

//@ts-ignore - options are not actually mandatory via StripeConfig docs
const stripe = new Stripe(STRIPE_SECRET_API_KEY);

export default async ({
  companyId,
  userId,
}: LeaveCompanyProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const worker = await User.findOne({ _id: userId });

    if (!worker) {
      throw { status: 404, error: "Worker not found" };
    }

    const subscriptionId = company.subscription?.subscriptionId as string;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    if (
      subscription.items.data[0]?.quantity &&
      subscription.items.data[0].quantity > 1
    ) {
      await stripe.subscriptionItems.update(subscription.items.data[0].id, {
        quantity: subscription.items.data[0]?.quantity - 1,
      });
    }

    await send({
      email: worker.email as string,
      type: "removedFromCompany",
      companyName: company.name,
    });

    company.workers = company.workers.filter(
      ({ userId: currentUserId }) =>
        currentUserId && userId.toString() !== currentUserId?.toString()
    );

    await company.save();

    return {
      status: 200,
      message: "Successfully removed from company",
    };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error removing you from this company",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
