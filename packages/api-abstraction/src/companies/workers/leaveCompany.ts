import { DELETE } from "../../requests";

export type leaveCompanyArgs = {
  companyId: string;
};

export const leaveCompany = async ({ companyId }: leaveCompanyArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/workers`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error removing you from this company",
    } = caught || {};

    return { status, error };
  }
};
