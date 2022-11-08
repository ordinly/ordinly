import { PUT } from "../../../requests";

export type UpdateInvitationToCompanyProjectArgs = {
  invitationId: string;
  projectId: string;
  permissions: any;
  companyId: string;
};

export const updateInvitationToCompanyProject = async ({
  projectId,
  invitationId,
  permissions,
  companyId,
}: UpdateInvitationToCompanyProjectArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/projects/${projectId}/companies/invitations/${invitationId}`,
      body: { permissions },
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this invitation",
    } = caught || {};

    return { status, error };
  }
};
