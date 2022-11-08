import { POST } from "../../requests";

export type CreateTeamArgs = {
  companyId: string;
  name: string;
  description?: string;
};

export const createTeam = async ({ companyId, ...rest }: CreateTeamArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/company/${companyId}/teams`,
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
      error = "There was an error creating this team",
    } = caught;

    throw { status, error };
  }
};
