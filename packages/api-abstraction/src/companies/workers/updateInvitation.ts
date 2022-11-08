import { PUT } from "../../requests";

export type UpdateInvitationArgs = {
  companyId: string;
  invitationId: string;
  roleId: string;
};

export const updateInvitation = async ({
  companyId,
  invitationId,
  roleId,
}: UpdateInvitationArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/workers/invitations/${invitationId}`,
      body: { roleId },
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
    } = caught;

    return { status, error };
  }
};
