import { DELETE } from "../../../../requests";

export type RemoveTaskArgs = {
  taskId: string;
  companyId: string;
  clientId: string;
  projectId: string;
};

export const removeTask = async ({
  companyId,
  clientId,
  projectId,
  taskId,
}: RemoveTaskArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/tasks/${taskId}`,
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
