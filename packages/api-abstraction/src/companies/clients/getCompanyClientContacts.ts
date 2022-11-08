import { GET } from "../../requests";

import type { SearchArgs } from "../../search/types";

export type GetCompanyClientContactssArgs = SearchArgs;

export const getCompanyClientContacts = async ({
  companyId,
  clientId,
  ...queryParams
}: GetCompanyClientContactssArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/clients/${clientId}/contacts`,
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
      error = "There was an error fetching your contacts",
    } = caught;

    return { status, error };
  }
};
