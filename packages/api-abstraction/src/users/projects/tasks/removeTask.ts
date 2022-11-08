import { DELETE } from "../../../requests";

export type RemoveUserTaskArgs = {
  taskId: string;
  projectId: string;
};

export const removeUserTask = async ({
  projectId,
  taskId,
}: RemoveUserTaskArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/user/projects/${projectId}/tasks/${taskId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const { status = 500, error = "There was an error removing this task" } =
      caught || {};

    return { status, error };
  }
};
