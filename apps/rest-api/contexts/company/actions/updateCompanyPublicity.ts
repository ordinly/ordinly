import { Company } from "@db/restAPIConnection/schemas/Company";

import type { APIResponse } from "@contexts/shared/types";

type UpdateCompanyPublicityProps = {
  companyId: string;
  userId: string;
  isPublic: boolean;
};

export default async ({
  companyId,
  userId,
  isPublic,
}: UpdateCompanyPublicityProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    if (userId === company?.owner.toString()) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to change whether this company is public",
      };
    }

    company.public = isPublic;

    await company.save();
    return { status: 200, message: "Company details updated" };
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
