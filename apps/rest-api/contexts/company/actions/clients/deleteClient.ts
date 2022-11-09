import { Company } from "@db/restAPIConnection/schemas/Company";

import type { APIResponse } from "@contexts/shared/types";

type DeleteCompanyProps = {
  companyId: string;
  clientId: string;
  userId: string;
};

export default async ({
  companyId,
  clientId,
  userId,
}: DeleteCompanyProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    console.log(userId);

    const client = company.clients?.find(
      ({ _id }) => _id?.toString() === clientId
    );

    if (!client) {
      throw { status: 404, error: "Client not found" };
    }

    client.deletedAt = new Date();
    client.deletedBy = userId;

    await company.save();
    return { status: 200, message: "Client deleted" };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error deleting this client",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
