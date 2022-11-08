import { UPLOAD } from "../requests";

export type UpdateCompanyDetailsArgs = {
  companyId: string;
  name: string;
  description: string;
  owner: string;
  public: boolean;
};

export const updateCompanyDetails = async ({
  companyId,
  ...rest
}: UpdateCompanyDetailsArgs) => {
  try {
    const response = await UPLOAD({
      action: "PUT",
      endpoint: `/api/company/${companyId}`,
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
