import { GET } from "../requests";

import type { SearchArgs } from "../search/types";

export type SearchCompaniesArgs = SearchArgs;

export type SearchWorkCompany = {
  _id: string;
  name: string;
  description?: string;
};

export type SearchCompaniesCompaniesResponse = {
  companies: SearchWorkCompany[];
};

export const searchCompanies = async (
  queryParams: SearchCompaniesArgs
): Promise<SearchCompaniesCompaniesResponse> => {
  try {
    const response = await GET<SearchCompaniesCompaniesResponse>({
      endpoint: `/api/company/search`,
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
      error = "There was an error searching for companies",
    } = caught;

    throw { status, error };
  }
};
