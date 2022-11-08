import { GET } from "../../requests";

import type { SearchArgs } from "../../search/types";

export type GetCompanyWorkersArgs = SearchArgs;

export const getCompanyWorkers = async ({
  companyId,
  ...queryParams
}: GetCompanyWorkersArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/workers`,
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
      error = "There was an error fetching your workers",
    } = caught;

    return { status, error };
  }
};
