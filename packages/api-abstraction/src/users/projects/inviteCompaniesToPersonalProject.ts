import { POST } from "../../requests";

export type InviteCompaniesToPersonalProjectArgs = {
  invitations: string[];
  projectId: string;
};

export const inviteCompaniesToPersonalProject = async ({
  projectId,
  ...rest
}: InviteCompaniesToPersonalProjectArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/user/projects/${projectId}/companies`,
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
