import { GET } from "../../requests";

import type { SearchArgs } from "../../search/types";

export type GetUserProjectCompaniesArgs = SearchArgs & { projectId: string };

export const getUserProjectCompanies = async ({
  projectId,
  ...queryParams
}: GetUserProjectCompaniesArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/user/projects/${projectId}/companies`,
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