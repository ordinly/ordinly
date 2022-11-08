import { DELETE } from "../../../requests";

export type DeleteProjectArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
};

export const deleteProject = async ({
  companyId,
  clientId,
  projectId,
}: DeleteProjectArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error deleting this project",
    } = caught;

    return { status, error };
  }
};
