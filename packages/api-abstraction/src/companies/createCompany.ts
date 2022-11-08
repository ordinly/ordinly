import { UPLOAD } from "../requests";

export type CreateCompanyArgs = {
  name: string;
  description?: string;
  invitations: string[];
};

export const createCompany = async (args: CreateCompanyArgs) => {
  try {
    const response = await UPLOAD<{ companyId: string }>({
      endpoint: "/api/company",
      body: args,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error creating this company",
    } = caught;

    return { status, error };
  }
};
