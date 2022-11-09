import Stripe from "stripe";

import { config } from "dotenv";

import { Company } from "@db/restAPIConnection/schemas/Company";

import type { APIResponse } from "@contexts/shared/types";

type DeleteCompanyProps = {
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
}: DeleteCompanyProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    if (userId === company.owner.toString()) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to delete this company",
      };
    }

    const subscriptionId = company.subscription?.subscriptionId as string;

    if (subscriptionId) {
      await stripe.subscriptions.del(subscriptionId);
    }

    company.deletedAt = new Date();

    await company.save();
    return { status: 200, message: "Company deleted" };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error updating this company",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
