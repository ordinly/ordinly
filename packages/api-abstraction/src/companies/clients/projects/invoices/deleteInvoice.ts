import { DELETE } from "../../../../requests";

export type DeleteInvoiceArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
  invoiceId: string;
};

export const deleteInvoice = async ({
  companyId,
  clientId,
  projectId,
  invoiceId,
}: DeleteInvoiceArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/invoice/${invoiceId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error deleting this invoice",
    } = caught;

    return { status, error };
  }
};
