import { DELETE } from "../../../requests";

export type RemoveCompanyFromCompanyProjectArgs = {
  projectId: string;
  companyId: string;
  invitedCompanyId: string;
};

export const removeCompanyFromCompanyProject = async ({
  projectId,
  companyId,
  invitedCompanyId,
}: RemoveCompanyFromCompanyProjectArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/projects/${projectId}/companies/${invitedCompanyId}`,
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
