import { GET } from "../../requests";

export type GetCompanyTeamArgs = { companyId: string; teamId: string };

export const getCompanyTeam = async ({
  companyId,
  teamId,
}: GetCompanyTeamArgs) => {
  try {
    const response = await GET({
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
      error = "There was an error fetching this team",
    } = caught;

    return { status, error };
  }
};
