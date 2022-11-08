import { GET } from "../../../../requests";

type GetClientInvoiceArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
  invoiceId: string;
};

export type InvoiceType = {
  _id: string;
  client: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  contact?: {
    name: string;
    email?: string;
    phoneNumber?: string;
  };
  address: {
    country: string;
    region: string;
    city: string;
    postalCode: string;
    streetAddress: string;
  };
  items: {
    description: string;
    quantity: number;
    price: number;
    additionalNotes: string;
  }[];
};

export type GetInvoiceResponse = {
  invoice: InvoiceType;
};

export const getProjectInvoice = async ({
  companyId,
  clientId,
  projectId,
  invoiceId,
}: GetClientInvoiceArgs): Promise<GetInvoiceResponse> => {
  try {
    const response = await GET<GetInvoiceResponse>({
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
      error = "There was an error fetching this invoice",
    } = caught;

    throw { status, error };
  }
};
