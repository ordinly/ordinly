import { POST } from "../requests";

export type DeclineInvitationProps = {
  invitationId: string;
};

export const declineInvitation = async ({
  invitationId,
}: DeclineInvitationProps) => {
  try {
    const response = await POST({
      endpoint: `/api/user/invitation/${invitationId}/decline`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "We weren't able to respond to this invitation",
    } = caught;

    throw { status, error };
  }
};
