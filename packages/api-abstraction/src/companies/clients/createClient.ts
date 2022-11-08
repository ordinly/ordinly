import { POST } from "../../requests";

export type CreateClientArgs = {
  companyId: string;
  description?: string;
  constacts: { name: string; emailAddress: string; phoneNumber: string }[];
} & (
  | { company: string }
  | {
      name: string;
      email: string;
      address?: {
        country?: string;
        region?: string;
        city?: string;
        postalCode?: string;
        streetAddress?: string;
      };
    }
);

export const createClient = async ({
  companyId,
  ...rest
}: CreateClientArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/company/${companyId}/clients`,
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
      error = "There was an error creating this client",
    } = caught;

    throw { status, error };
  }
};
