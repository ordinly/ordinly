import { PUT } from "../../requests";

export type UpdateTeamArgs = {
  companyId: string;
  teamId: string;
  members: string[];
  name: string;
  description: string;
};

export const updateTeam = async ({
  companyId,
  teamId,
  ...role
}: UpdateTeamArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/teams/${teamId}`,
      body: role,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this team's info",
    } = caught;

    return { status, error };
  }
};
