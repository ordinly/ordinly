import Stripe from "stripe";

import { config } from "dotenv";

import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type UpdateWorkerProps = {
  companyId: string;
  workerId: string;
  roleId: string;
  status: string;
  userId: string;
};

config();

const STRIPE_SECRET_API_KEY: string =
  process.env["STRIPE_SECRET_API_KEY"] || "";

//@ts-ignore - options are not actually mandatory via StripeConfig docs
const stripe = new Stripe(STRIPE_SECRET_API_KEY);

export default async ({
  companyId,
  workerId,
  roleId,
  status,
  userId,
}: UpdateWorkerProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

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
        error: "You don't have the necessary permissions to update this worker",
      };
    }

    const worker = company.workers.find(
      ({ _id }) => _id.toString() === workerId
    );

    if (!worker) {
      throw { status: 404, error: "Worker not found" };
    }

    let subscription;

    if (company.subscription?.subscriptionId) {
      const subscriptionId = company.subscription?.subscriptionId as string;

      subscription = await stripe.subscriptions.retrieve(subscriptionId);
    }

    if (status !== worker.status) {
      if (subscription) {
        if (status === "active") {
          await stripe.subscriptionItems.update(subscription.items.data[0].id, {
            quantity: (subscription.items.data[0]?.quantity || 0) + 1,
          });
        } else {
          await stripe.subscriptionItems.update(
            subscription.items.data[0].id,
            //@ts-ignore
            { quantity: subscription.items.data[0].quantity - 1 }
          );
        }
      }

      worker.status = status || worker.status;
    }

    worker.roleId = roleId;

    await company.save();

    return { status: 200, message: "Worker info successfully updated" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this worker's info",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
