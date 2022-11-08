import { PUT } from "../../../../requests";

import type { Invoice } from "./createInvoice";

export type UpdateInvoiceArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
  invoiceId: string;
  invoice: Invoice;
};

export const updateInvoice = async ({
  companyId,
  clientId,
  projectId,
  invoiceId,
  ...rest
}: UpdateInvoiceArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/invoice/${invoiceId}`,
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
      error = "There was an error updating this invoice",
    } = caught;

    return { status, error };
  }
};
