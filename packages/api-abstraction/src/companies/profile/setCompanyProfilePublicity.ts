import { PUT } from "../../requests";

export type UpdateCompanyProfilePublicityArgs = {
  companyId: string;
  public: boolean;
};

export const updateCompanyProfilePublicity = async ({
  companyId,
  ...body
}: UpdateCompanyProfilePublicityArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/profile/publicity`,
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
