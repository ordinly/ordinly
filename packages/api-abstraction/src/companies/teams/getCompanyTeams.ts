import { GET } from "../../requests";

import type { SearchArgs } from "../../search/types";

export type GetCompanyTeamsArgs = SearchArgs;

export const getCompanyTeams = async ({
  companyId,
  ...queryParams
}: GetCompanyTeamsArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/teams`,
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
      error = "There was an error fetching your teams",
    } = caught;

    return { status, error };
  }
};
