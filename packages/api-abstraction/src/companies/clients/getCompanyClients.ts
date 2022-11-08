import { GET } from "../../requests";

import type { SearchArgs } from "../../search/types";

export type GetCompanyClientsArgs = SearchArgs;

export const getCompanyClients = async ({
  companyId,
  ...queryParams
}: GetCompanyClientsArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/clients`,
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
      error = "There was an error fetching your clients",
    } = caught;

    return { status, error };
  }
};
