import { GET } from "../../../requests";

export type GetUserProjectTaskAnalyticsArgs = { projectId: string };

export const getUserProjectTaskAnalytics = async ({
  projectId,
}: GetUserProjectTaskAnalyticsArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/user/projects/${projectId}/tasks/analytics`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching your task analytics",
    } = caught;

    return { status, error };
  }
};
