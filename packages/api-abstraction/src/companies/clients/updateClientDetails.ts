import { PUT } from "../../requests";

export type UpdateClientDetailsArgs = {
  companyId: string;
  clientId: string;
  name: string;
  description: string;
};

export const updateClientDetails = async ({
  companyId,
  clientId,
  ...rest
}: UpdateClientDetailsArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/clients/${clientId}`,
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
      error = "There was an error updating this client",
    } = caught;

    return { status, error };
  }
};
