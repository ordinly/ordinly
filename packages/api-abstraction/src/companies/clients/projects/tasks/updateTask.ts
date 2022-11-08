import { UPLOAD } from "../../../../requests";

export type UpdateTaskArgs = {
  taskId: string;
  companyId: string;
  clientId: string;
  projectId: string;
  name: string;
  dueDate?: string;
  description?: string;
  assignedWorkers?: string[];
  assignedTeams?: string[];
  assignedClients?: string[];
};

export const updateTask = async ({
  companyId,
  clientId,
  projectId,
  taskId,
  ...rest
}: UpdateTaskArgs) => {
  try {
    const response = await UPLOAD({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/tasks/${taskId}`,
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
