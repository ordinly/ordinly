import { UPLOAD } from "../../../requests";

export type UpdateContactArgs = {
  companyId: string;
  clientId: string;
  contactId: string;
  name: string;
  role?: string;
  email?: string;
  phoneNumber?: number;
  notes?: string[];
  files?: string[];
};

export const updateContact = async ({
  companyId,
  clientId,
  contactId,
  ...rest
}: UpdateContactArgs) => {
  try {
    const response = await UPLOAD({
      endpoint: `/api/company/${companyId}/clients/${clientId}/contacts/${contactId}`,
      body: rest,
      action: "PUT",
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this contact",
    } = caught;

    return { status, error };
  }
};
