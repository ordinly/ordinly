import { POST } from "../../../../requests";

export type Invoice = {
  client: string;
  clientId: string;
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

export type CreateInvoiceArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
  invoice: Invoice;
};

export const createInvoice = async ({
  companyId,
  clientId,
  projectId,
  ...rest
}: CreateInvoiceArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/invoice`,
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
      error = "There was an error creating this invoice",
    } = caught;

    throw { status, error };
  }
};
