import Stripe from "stripe";

import { config } from "dotenv";

import { Company } from "@db/restAPIConnection/schemas/Company";

type UpdateSubscriptionProps = {
  url: string;
  companyId: string;
};

config();

const STRIPE_SECRET_API_KEY: string =
  process.env["STRIPE_SECRET_API_KEY"] || "";

//@ts-ignore - options are not actually mandatory via StripeConfig docs
const stripe = new Stripe(STRIPE_SECRET_API_KEY);

export default async ({ url, companyId }: UpdateSubscriptionProps) => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const session = await stripe.billingPortal.sessions.create({
      //@ts-ignore
      customer: company.subscription.customerId,
      return_url: url,
    });

    return {
      status: 200,
      message: "Customer portal session created",
      sessionURL: session.url,
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error creating this customer portal session",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
