import { Company } from "@db/restAPIConnection/schemas/Company";

import type { APIResponse } from "@contexts/shared/types";

export default async ({
  emailAddress,
  companyId,
  exists = false,
}: {
  emailAddress: string;
  companyId?: string;
  exists?: boolean;
}): APIResponse => {
  try {
    const company = await Company.findOne({
      $and: [{ emailAddress }, { _id: { $ne: companyId } }],
      deletedAt: { $exists: false },
    });

    if (!exists && company) {
      throw {
        status: 409,
        error: "A company has already used that email address",
      };
    }

    if (exists && !company) {
      throw {
        status: 404,
        error: "A company with that email address does not exist",
      };
    }

    return {
      status: 200,
      message: "Email address valid",
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error validating this email address",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
