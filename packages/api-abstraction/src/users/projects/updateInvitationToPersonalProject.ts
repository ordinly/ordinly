import { PUT } from "../../requests";

export type UpdateInvitationToPersonalProjectArgs = {
  invitationId: string;
  projectId: string;
  permissions: any;
};

export const updateInvitationToPersonalProject = async ({
  projectId,
  invitationId,
  permissions,
}: UpdateInvitationToPersonalProjectArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/user/projects/${projectId}/companies/invitations/${invitationId}`,
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
