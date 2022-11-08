import { GET } from "../../requests";

import type { SearchArgs } from "../../search/types";

export type GetUserProjectsArgs = SearchArgs;

export const getUserProjects = async (queryParams: GetUserProjectsArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/user/projects`,
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
      error = "There was an error fetching your projects",
    } = caught;

    return { status, error };
  }
};
