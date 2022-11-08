import { POST } from "../../../requests";

export type InviteCompaniesToCompanyProjectArgs = {
  invitations: string[];
  projectId: string;
  companyId: string;
};

export const inviteCompaniesToCompanyProject = async ({
  projectId,
  companyId,
  ...rest
}: InviteCompaniesToCompanyProjectArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/company/${companyId}/projects/${projectId}/companies`,
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
      error = "There was an error inviting these companies",
    } = caught;

    throw { status, error };
  }
};
