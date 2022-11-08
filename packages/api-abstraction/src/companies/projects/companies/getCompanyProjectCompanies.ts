import { GET } from "../../../requests";

import type { SearchArgs } from "../../../search/types";

export type GetCompanyProjectCompaniesArgs = SearchArgs & {
  projectId: string;
  companyId: string;
};

export const getCompanyProjectCompanies = async ({
  projectId,
  companyId,
  ...queryParams
}: GetCompanyProjectCompaniesArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/projects/${projectId}/companies`,
      queryParams,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these companies",
    } = caught;

    return { status, error };
  }
};
