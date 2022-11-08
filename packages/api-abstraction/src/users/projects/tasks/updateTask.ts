import { UPLOAD } from "../../../requests";

export type UpdateUserTaskArgs = {
  taskId: string;
  projectId: string;
  name: string;
  dueDate?: string;
  description?: string;
  assignedVendors?: string[];
};

export const updateUserTask = async ({
  projectId,
  taskId,
  ...rest
}: UpdateUserTaskArgs) => {
  try {
    const response = await UPLOAD({
      endpoint: `/api/user/projects/${projectId}/tasks/${taskId}`,
      body: rest,
      action: "PUT",
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const { status = 500, error = "There was an error updating this task" } =
      caught || {};

    return { status, error };
  }
};
