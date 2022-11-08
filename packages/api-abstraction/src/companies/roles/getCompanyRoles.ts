import { GET } from "../../requests";

import type { SearchArgs } from "../../search/types";

export type GetCompanyRolesArgs = SearchArgs;

export const getCompanyRoles = async ({
  companyId,
  ...queryParams
}: GetCompanyRolesArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/roles`,
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
      error = "There was an error fetching your roles",
    } = caught;

    return { status, error };
  }
};
