import { PUT } from "../../requests";

export type UpdateCompanyProfileArgs = {
  companyId: string;
  [key: string]: any;
};

export const updateCompanyProfile = async ({
  companyId,
  ...body
}: UpdateCompanyProfileArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/profile`,
      body,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this profile",
    } = caught;

    return { status, error };
  }
};
