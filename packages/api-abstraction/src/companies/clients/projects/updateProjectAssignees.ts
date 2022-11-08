import { PUT } from "../../../requests";

export type UpdateProjectAssigneesArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
  assignedWorkers: string[];
  assignedTeams: string[];
};

export const updateProjectAssignees = async ({
  companyId,
  clientId,
  projectId,
  ...rest
}: UpdateProjectAssigneesArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/assignees`,
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
      error = "There was an error updating this project",
    } = caught;

    return { status, error };
  }
};
