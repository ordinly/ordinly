import { PUT } from "../requests";

export type UpdateCompanyOwnerArgs = {
  companyId: string;
  onChangeOwner: "change-role" | "leave-company";
  newOwner: string;
  newRole?: string;
};

export const updateCompanyOwner = async ({
  companyId,
  ...rest
}: UpdateCompanyOwnerArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/owner`,
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
      error = "There was an error updating this company",
    } = caught;

    return { status, error };
  }
};
