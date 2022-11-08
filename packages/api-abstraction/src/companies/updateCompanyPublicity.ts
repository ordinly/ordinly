import { PUT } from "../requests";

export type UpdateCompanyPublicityArgs = {
  companyId: string;
  public: boolean;
};

export const updateCompanyPublicity = async ({
  companyId,
  ...rest
}: UpdateCompanyPublicityArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/publicity`,
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
