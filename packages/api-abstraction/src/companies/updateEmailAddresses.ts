import { PUT } from "../requests";

export type UpdateCompanyEmailAddressesArgs = {
  companyId: string;
  emailAddresses: string[];
};

export const updateCompanyEmailAddresses = async ({
  companyId,
  ...rest
}: UpdateCompanyEmailAddressesArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/contact-info/email-addresses`,
      body: rest,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this company",
    } = caught;

    return { status, error };
  }
};
