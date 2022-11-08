import { GET } from "../../../requests";

import type { Permissions } from "../../../companies/getCompany";

export const getCompanyProjectMinimumPermissions = async () => {
  try {
    const response = await GET<{ permissions: Permissions }>({
      endpoint: `/api/company/companies/minimum-permissions`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these permissions",
    } = caught;

    return { status, error };
  }
};
