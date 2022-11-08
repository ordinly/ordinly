import { POST } from "../../../requests";

export type CreateProjectArgs = {
  companyId: string;
  clientId: string;
  name: string;
  description: string;
  workers?: string[];
  teams?: string[];
};

export const createProject = async ({
  companyId,
  clientId,
  ...rest
}: CreateProjectArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects`,
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
      error = "There was an error creating this project",
    } = caught;

    throw { error };
  }
};
