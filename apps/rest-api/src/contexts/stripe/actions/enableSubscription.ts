import { Company } from "@db/restAPIConnection/schemas/Company";

type EnableSubscriptionProps = {
  companyId: string;
  subscriptionId: string;
  customerId: string;
};

export default async ({
  companyId,
  subscriptionId,
  customerId,
}: EnableSubscriptionProps) => {
  try {
    console.log(companyId);
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    company.subscription = { active: true, subscriptionId, customerId };

    await company.save();

    return {
      status: 200,
      message: "Subscription created",
    };
  } catch (caught: any) {
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
