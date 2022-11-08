import { GET } from "../../../../requests";

type GetClientInvoicesArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
};

export type ClientInvoice = {
  _id: string;
  issueDate: Date;
  dueDate: Date;
  invoiceNumber: string;
  total: number;
};

export type GetInvoicesResponse = {
  invoices: ClientInvoice[];
};

export const getClientInvoices = async ({
  companyId,
  clientId,
  projectId,
}: GetClientInvoicesArgs): Promise<GetInvoicesResponse> => {
  try {
    const response = await GET<GetInvoicesResponse>({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/invoice`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching your invoices",
    } = caught;

    throw { status, error };
  }
};
