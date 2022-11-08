import { GET } from "../../../requests";

export type GetCompanyProjectCompanyArgs = {
  projectId: string;
  companyId: string;
  projectCompanyId: string;
};

export const getCompanyProjectCompany = async ({
  projectId,
  companyId,
  projectCompanyId,
}: GetCompanyProjectCompanyArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/projects/${projectId}/companies/${projectCompanyId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching this company",
    } = caught;

    return { status, error };
  }
};
