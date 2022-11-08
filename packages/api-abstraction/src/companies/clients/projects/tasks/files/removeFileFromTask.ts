import { DELETE } from "../../../../../requests";

export type RemoveFileFromTaskArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
  taskId: string;
  fileId: string;
};

export const removeFileFromTask = async ({
  companyId,
  clientId,
  projectId,
  taskId,
  fileId,
}: RemoveFileFromTaskArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/tasks/${taskId}/files/${fileId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error removing this file",
    } = caught;

    return { status, error };
  }
};
