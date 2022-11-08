import { UPLOAD } from "../../../requests";

export type CreateCompanyProjectTaskArgs = {
  projectId: string;
  companyId: string;
  name: string;
  dueDate?: string;
  description?: string;
  assignedCompany?: string;
  assignedTeam?: string;
  assignedWorker?: string;
};

export const createCompanyProjectTask = async ({
  companyId,
  projectId,
  ...rest
}: CreateCompanyProjectTaskArgs) => {
  try {
    const response = await UPLOAD({
      endpoint: `/api/company/${companyId}/projects/${projectId}/tasks`,
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
      error = "There was an error creating this task",
    } = caught;

    throw { error };
  }
};
