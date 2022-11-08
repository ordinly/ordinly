import { DELETE } from "../../requests";

export type RemoveTeamArgs = {
  companyId: string;
  teamId: string;
};

export const removeTeam = async ({ companyId, teamId }: RemoveTeamArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/teams/${teamId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error removing this team from this company",
    } = caught || {};

    return { status, error };
  }
};
