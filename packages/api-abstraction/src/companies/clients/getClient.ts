import { GET } from "../../requests";

export const getClient = async ({
  companyId,
  clientId,
}: {
  companyId: string;
  clientId: string;
}) => {
  try {
    const response = await GET<{ client: any }>({
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
      error = "There was an error fetching this client",
    } = caught;

    return { status, error };
  }
};
