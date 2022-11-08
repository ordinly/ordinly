import { GET } from "../../../requests";

export type GetUserProjectTaskArgs = { projectId: string; taskId: string };

export const getUserProjectTask = async ({
  projectId,
  taskId,
}: GetUserProjectTaskArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/user/projects/${projectId}/tasks/${taskId}`,
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
