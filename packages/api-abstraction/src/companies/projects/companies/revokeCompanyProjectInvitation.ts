import { DELETE } from "../../../requests";

export type RevokeInvitationToCompanyProjectArgs = {
  invitationId: string;
  projectId: string;
  companyId: string;
};

export const revokeInvitationToCompanyProject = async ({
  projectId,
  invitationId,
  companyId,
}: RevokeInvitationToCompanyProjectArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/projects/${projectId}/companies/invitations/${invitationId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error revoking this invitation",
    } = caught || {};

    return { status, error };
  }
};
