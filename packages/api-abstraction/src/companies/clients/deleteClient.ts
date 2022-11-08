import { DELETE } from "../../requests";

export type DeleteClientArgs = {
  companyId: string;
  clientId: string;
};

export const deleteClient = async ({
  companyId,
  clientId,
}: DeleteClientArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/clients/${clientId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error deleting this client",
    } = caught;

    return { status, error };
  }
};
