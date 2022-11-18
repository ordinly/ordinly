import send from "@services/email";

import { Company } from "@db/restAPIConnection/schemas/Company";
import { User } from "@db/restAPIConnection/schemas/User";

type MissedPaymentProps = {
  companyId: string;
};

export default async ({ companyId }: MissedPaymentProps) => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const owner = await User.findOne({ _id: company.owner });

    if (owner) {
      await send({
        email: owner.email as string,
        type: "missedPayment",
        companyName: company.name,
      });
    }

    return {
      status: 200,
      message: "Customer notified",
    };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error notifying this customer",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
