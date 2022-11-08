import { POST } from "../../../../../requests";

export type AddCommentArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
  taskId: string;
  text: string;
};

export const addComment = async ({
  companyId,
  clientId,
  projectId,
  taskId,
  ...rest
}: AddCommentArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/tasks/${taskId}/comments`,
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
      error = "There was an error adding this comment",
    } = caught;

    return { status, error };
  }
};
