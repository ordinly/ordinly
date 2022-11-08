import { DELETE } from "../../../requests";

export type DeleteCompanyProjectTaskArgs = {
  companyId: string;
  projectId: string;
  taskId: string;
};

export const deleteCompanyProjectTask = async ({
  companyId,
  projectId,
  taskId,
}: DeleteCompanyProjectTaskArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/projects/${projectId}/tasks/${taskId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error deleting this task",
    } = caught;

    return { status, error };
  }
};
