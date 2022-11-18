import { Company } from "@db/restAPIConnection/schemas/Company";

import { removeSingle } from "@services/documents";

import type { APIResponse } from "@contexts/shared/types";

type UpdateCompanyDetailsProps = {
  companyId: string;
  name: string;
  description: string;
  emailAddress: string;
  phoneNumber: string;
  userId: string;
  profilePicture: any;
};

export default async ({
  companyId,
  name,
  description,
  emailAddress,
  phoneNumber,
  userId,
  profilePicture,
}: UpdateCompanyDetailsProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    if (company.owner.toString() !== userId.toString()) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to update this company",
      };
    }

    if (!profilePicture) {
      await removeSingle({
        bucket: "companies",
        key: `/${companyId}/profile-picture`,
      });
    } else {
      company.profilePicture = profilePicture;
    }

    company.name = name;
    company.description = description;
    company.emailAddress = emailAddress;
    company.phoneNumber = phoneNumber;

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
