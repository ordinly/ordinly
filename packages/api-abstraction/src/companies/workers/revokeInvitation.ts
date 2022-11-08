import { DELETE } from "../../requests";

export type RevokeInvitationArgs = {
  companyId: string;
  invitationId: string;
};

export const revokeInvitation = async ({
  companyId,
  invitationId,
}: RevokeInvitationArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/workers/invitations/${invitationId}`,
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
    } = caught;

    return { status, error };
  }
};
