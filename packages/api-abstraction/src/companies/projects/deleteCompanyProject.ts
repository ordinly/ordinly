import { DELETE } from "../../requests";

export type DeleteCompanyProjectArgs = {
  companyId: string;
  projectId: string;
};

export const deleteCompanyProject = async ({
  companyId,
  projectId,
}: DeleteCompanyProjectArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/projects/${projectId}`,
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
