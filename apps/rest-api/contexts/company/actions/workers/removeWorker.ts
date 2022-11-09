import Stripe from "stripe";

import { config } from "dotenv";

import { Company } from "@db/restAPIConnection/schemas/Company";
import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { User } from "@db/restAPIConnection/schemas/User";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

import send from "@services/email";

type RemoveWorkerProps = {
  companyId: string;
  workerId: string;
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
  userId,
}: RemoveWorkerProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.people.workers.remove) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to remove a worker",
      };
    }

    const [selectedWorker] = company.workers.splice(
      company.workers.findIndex(({ _id }) => _id.toString() === workerId),
      1
    );

    const worker = await User.findOne({ _id: selectedWorker?.userId });

    if (company.subscription?.subscriptionId) {
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
    }

    const invitation = await Invitation.findOne({
      ...(selectedWorker?.userId
        ? { "to.userId": selectedWorker?.userId }
        : selectedWorker?.email
        ? { "to.email": selectedWorker?.email }
        : {}),
      "from.companyId": companyId,
      revoked: { $exists: false },
      accepted: { $exists: false },
    });

    if (invitation) {
      invitation.revoked = true;

      await invitation.save();
    }

    if (worker) {
      await send({
        email: worker.email as string,
        type: "removedFromCompany",
        companyName: company.name,
      });
    } else {
      if (selectedWorker?.email) {
        await send({
          email: selectedWorker.email as string,
          type: "removedFromCompany",
          companyName: company.name,
        });
      }
    }

    await company.save();

    return {
      status: 200,
      message: "Worker successfully removed from company",
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error removing this worker from this company",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
