import { POST } from "../../requests";

export type RespondToInvitationArgs = {
  companyId: string;
  invitationId: string;
  accepted: boolean;
};

export const respondToInvitation = async ({
  companyId,
  invitationId,
  ...rest
}: RespondToInvitationArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/company/${companyId}/invitations/${invitationId}/respond`,
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
      error = "There was an error responding to this invitation",
    } = caught;

    throw { status, error };
  }
};
