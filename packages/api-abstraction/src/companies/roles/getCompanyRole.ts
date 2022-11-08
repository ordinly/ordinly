import { GET } from "../../requests";

export type GetCompanyRoleArgs = { companyId: string; roleId: string };

export const getCompanyRole = async ({
  companyId,
  roleId,
}: GetCompanyRoleArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/roles/${roleId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching this role",
    } = caught;

    return { status, error };
  }
};
