import { POST } from "../requests";

export type AcceptInvitationProps = {
  invitationId: string;
};

export const acceptInvitation = async ({
  invitationId,
}: AcceptInvitationProps) => {
  try {
    const response = await POST({
      endpoint: `/api/user/invitation/${invitationId}/accept`,
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
