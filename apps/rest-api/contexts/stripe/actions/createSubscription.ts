import Stripe from "stripe";

import { config } from "dotenv";

import { Company } from "@db/restAPIConnection/schemas/Company";

type CreateSubscriptionProps = {
  url: string;
  companyId: string;
};

config();

const NODE_ENV = process.env["NODE_ENV"] || "";

const STRIPE_SECRET_API_KEY: string =
  process.env["STRIPE_SECRET_API_KEY"] || "";

const successQueryParams = "?tab=workers-tab&subscription-success=true";

const errorQueryParams = "?tab=workers-tab&subscription-error=true";

//@ts-ignore - options are not actually mandatory via StripeConfig docs
const stripe = new Stripe(STRIPE_SECRET_API_KEY);

export default async ({ url, companyId }: CreateSubscriptionProps) => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price:
            NODE_ENV === "production"
              ? "price_1KImX0H8m3UI8K0ZWvRVs5ad"
              : "price_1KImNRH8m3UI8K0ZzUfqznrD",
          quantity: company.workers.length,
        },
      ],
      subscription_data: {
        metadata: { companyId },
        ...(Math.ceil(Date.now() / 1000) <
        Math.ceil(company.createdAt.getTime() / 1000) + 2678400
          ? {
              trial_end:
                Math.ceil(company.createdAt.getTime() / 1000) + 2678400,
            }
          : {}),
      },
      // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
      // the actual Session ID is returned in the query parameter when your customer
      // is redirected to the success page.
      success_url: `${url}${successQueryParams}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}${errorQueryParams}&success=false`,
    });

    return {
      status: 200,
      message: "Checkout session created",
      sessionId: session.id,
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error creating this subscription",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
