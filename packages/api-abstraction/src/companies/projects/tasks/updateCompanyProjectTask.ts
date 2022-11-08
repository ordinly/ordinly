import { UPLOAD } from "../../../requests";

export type UpdateCompanyProjectTaskDetailsArgs = {
  taskId: string;
  projectId: string;
  companyId: string;
  name: string;
  dueDate?: string;
  description?: string;
  assignedCompany?: string;
  assignedTeam?: string;
  assignedWorker?: string;
};

export const updateCompanyProjectTaskDetails = async ({
  projectId,
  companyId,
  taskId,
  ...rest
}: UpdateCompanyProjectTaskDetailsArgs) => {
  try {
    const response = await UPLOAD({
      endpoint: `/api/company/${companyId}/projects/${projectId}/tasks/${taskId}`,
      body: rest,
      action: "PUT",
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this project",
    } = caught;

    return { status, error };
  }
};
