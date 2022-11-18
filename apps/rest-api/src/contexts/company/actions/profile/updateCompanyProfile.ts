import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type UpdateCompanyProfileProps = {
  companyId: string;
  userId: string;
  tagline: string;
  description: string;
  tags: string[];
};

export default async ({
  companyId,
  userId,
  tagline,
  description,
  tags,
}: UpdateCompanyProfileProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.settings.profile.edit) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to update this company",
      };
    }

    company.profile.tagline = tagline;
    company.profile.description = JSON.stringify(description);
    company.profile.tags = tags;

    await company.save();

    return { status: 200, message: "Company profile updated" };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error updating this company profile",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
