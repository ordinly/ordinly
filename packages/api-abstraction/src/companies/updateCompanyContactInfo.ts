import { PUT } from "../requests";

export type UpdateCompanyContactInfoArgs = {
  companyId: string;
  emailAddresses: string[];
};

export const updateCompanyContactInfo = async ({
  companyId,
  ...rest
}: UpdateCompanyContactInfoArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/contact-info`,
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
