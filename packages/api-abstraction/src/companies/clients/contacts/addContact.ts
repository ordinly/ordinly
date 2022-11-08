import { UPLOAD } from "../../../requests";

export type AddContactArgs = {
  companyId: string;
  clientId: string;
  name: string;
  role?: string;
  email?: string;
  phoneNumber?: number;
  notes?: string[];
  files?: string[];
};

export const addContact = async ({
  companyId,
  clientId,
  ...rest
}: AddContactArgs) => {
  try {
    const response = await UPLOAD({
      endpoint: `/api/company/${companyId}/clients/${clientId}/contacts`,
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
      error = "There was an error creating this contact",
    } = caught;

    throw { error };
  }
};
