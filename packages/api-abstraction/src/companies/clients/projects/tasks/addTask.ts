import { UPLOAD } from "../../../../requests";

export type AddTaskArgs = {
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

export const addTask = async ({
  companyId,
  clientId,
  projectId,
  ...rest
}: AddTaskArgs) => {
  try {
    const response = await UPLOAD({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/tasks`,
      body: rest,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error adding this task",
    } = caught;

    throw { status, error };
  }
};
