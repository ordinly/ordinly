import { POST } from "../../requests";

export type CreateCompanyProjectArgs = {
  companyId: string;
  name: string;
  description: string;
  workers?: string[];
  teams?: string[];
};

export const createCompanyProject = async ({
  companyId,
  ...rest
}: CreateCompanyProjectArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/company/${companyId}/projects`,
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
