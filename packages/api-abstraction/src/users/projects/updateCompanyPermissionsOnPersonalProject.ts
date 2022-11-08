import { PUT } from "../../requests";

export type UpdateUserCompanyPermissionsArgs = {
  companyId: string;
  projectId: string;
  permissions: any;
};

export const updateCompanyPermissionsOnPersonalProject = async ({
  projectId,
  companyId,
  permissions,
}: UpdateUserCompanyPermissionsArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/user/projects/${projectId}/companies/${companyId}`,
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
