import { DELETE } from "../../requests";

export type RevokeInvitationToPersonalProjectArgs = {
  invitationId: string;
  projectId: string;
};

export const revokeInvitationToPersonalProject = async ({
  projectId,
  invitationId,
}: RevokeInvitationToPersonalProjectArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/user/projects/${projectId}/companies/invitations/${invitationId}`,
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
