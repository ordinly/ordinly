import { PUT } from "../../requests";

export type UpdateRoleArgs = {
  companyId: string;
  roleId: string;
  permissions: any;
  name: string;
  description: string;
};

export const updateRole = async ({
  companyId,
  roleId,
  ...role
}: UpdateRoleArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/roles/${roleId}`,
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
      error = "There was an error updating this role's info",
    } = caught;

    return { status, error };
  }
};
