import { PUT } from "../requests";

export type UpdateCompanyPhoneNumbersArgs = {
  companyId: string;
  phoneNumbers: string[];
};

export const updateCompanyPhoneNumbers = async ({
  companyId,
  ...rest
}: UpdateCompanyPhoneNumbersArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/contact-info/phone-numbers`,
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
