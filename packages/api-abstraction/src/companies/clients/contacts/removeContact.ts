import { DELETE } from "../../../requests";

export type RemoveContactArgs = {
  companyId: string;
  clientId: string;
  contactId: string;
};

export const removeContact = async ({
  companyId,
  clientId,
  contactId,
}: RemoveContactArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/clients/${clientId}/contacts/${contactId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error deleting this contact",
    } = caught;

    return { status, error };
  }
};
