import { GET } from "../../requests";

import type { SearchArgs } from "../../search/types";

export type GetCompanyVendorsArgs = SearchArgs;

export const getCompanyVendors = async ({
  companyId,
  ...queryParams
}: GetCompanyVendorsArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/vendors`,
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
      error = "There was an error fetching your vendors",
    } = caught;

    return { status, error };
  }
};
