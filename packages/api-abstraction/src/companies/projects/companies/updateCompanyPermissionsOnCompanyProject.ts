import { PUT } from "../../../requests";

export type UpdateCompanyPermissionsArgs = {
  companyId: string;
  projectId: string;
  permissions: any;
  invitedCompanyId: string;
};

export const updateCompanyPermissionsOnCompanyProject = async ({
  projectId,
  companyId,
  permissions,
  invitedCompanyId,
}: UpdateCompanyPermissionsArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/projects/${projectId}/companies/invitations/${invitedCompanyId}`,
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
