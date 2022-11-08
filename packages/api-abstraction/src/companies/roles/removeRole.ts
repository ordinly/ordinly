import { DELETE } from "../../requests";

export type RemoveRoleArgs = {
  companyId: string;
  roleId: string;
};

export const removeRole = async ({ companyId, roleId }: RemoveRoleArgs) => {
  try {
    const response = await DELETE({
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
      error = "There was an error removing this role from this company",
    } = caught || {};

    return { status, error };
  }
};
