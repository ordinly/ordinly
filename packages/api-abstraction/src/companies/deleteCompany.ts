import { DELETE } from "../requests";

export type DeleteCompanyArgs = {
  companyId: string;
};

export const deleteCompany = async ({ companyId }: DeleteCompanyArgs) => {
  try {
    const response = await DELETE({ endpoint: `/api/company/${companyId}` });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error deleting this company",
    } = caught;

    return { status, error };
  }
};
