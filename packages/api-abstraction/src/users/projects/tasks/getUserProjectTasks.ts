import { GET } from "../../../requests";

import type { SearchArgs } from "../../../search/types";

export type GetUserProjectTasksArgs = SearchArgs & { projectId: string };

export const getUserProjectTasks = async ({
  projectId,
  ...queryParams
}: GetUserProjectTasksArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/user/projects/${projectId}/tasks`,
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
      error = "There was an error fetching these tasks",
    } = caught;

    return { status, error };
  }
};
