import { PUT } from "../../requests";

export type UpdateCompanyProjectDetailsArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
  name: string;
  description: string;
  owner: string;
};

export const updateCompanyProjectDetails = async ({
  projectId,
  companyId,
  ...rest
}: UpdateCompanyProjectDetailsArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/projects/${projectId}`,
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
      error = "There was an error updating this project",
    } = caught;

    return { status, error };
  }
};
