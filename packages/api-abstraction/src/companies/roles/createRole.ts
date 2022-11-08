import { POST } from "../../requests";

export type CreateRoleArgs = {
  companyId: string;
  name: string;
  description?: string;
  permissions: any;
};

export const createRole = async ({ companyId, ...rest }: CreateRoleArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/company/${companyId}/roles`,
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
      error = "There was an error creating this role",
    } = caught;

    return { status, error };
  }
};
