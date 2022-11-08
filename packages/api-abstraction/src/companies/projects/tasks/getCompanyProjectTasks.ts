import { GET } from "../../../requests";

import type { SearchArgs } from "../../../search/types";

export type GetCompanyProjectTasksArgs = SearchArgs & {
  projectId: string;
  companyId: string;
};

export const getCompanyProjectTasks = async ({
  projectId,
  companyId,
  ...queryParams
}: GetCompanyProjectTasksArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/projects/${projectId}/tasks`,
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
