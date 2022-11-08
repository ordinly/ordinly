import { GET } from "../../../requests";

import type { SearchArgs } from "../../../search/types";

export type GetCompanyProjectTaskArgs = SearchArgs & {
  projectId: string;
  companyId: string;
  taskId: string;
};

export const getCompanyProjectTask = async ({
  projectId,
  companyId,
  taskId,
  ...queryParams
}: GetCompanyProjectTaskArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/projects/${projectId}/tasks/${taskId}`,
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
      error = "There was an error fetching this task",
    } = caught;

    return { status, error };
  }
};
