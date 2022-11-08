import { UPLOAD } from "../../../../../requests";

export type AddFileToTask = {
  companyId: string;
  clientId: string;
  projectId: string;
  taskId: string;
  file: any;
};

export const addFileToTask = async ({
  companyId,
  clientId,
  projectId,
  taskId,
  file,
}: AddFileToTask) => {
  try {
    const response = await UPLOAD({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/tasks/${taskId}/files`,
      body: { file },
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error uploading this file",
    } = caught;

    return { status, error };
  }
};
