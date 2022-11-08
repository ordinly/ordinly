import { DELETE } from "../../requests";

export type RemoveCompanyFromUserProjectArgs = {
  projectId: string;
  companyId: string;
};

export const removeCompanyFromPersonalProject = async ({
  projectId,
  companyId,
}: RemoveCompanyFromUserProjectArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/user/projects/${projectId}/companies/${companyId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error removing this company",
    } = caught;

    return { status, error };
  }
};
