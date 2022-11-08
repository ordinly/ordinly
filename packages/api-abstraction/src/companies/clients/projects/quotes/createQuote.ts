import { POST } from "../../../../requests";

export type Quote = {
  isEstimate: boolean;
  client: string;
  clientId: string;
  quoteNumber: string;
  quoteDate: Date;
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

export type CreateQuoteArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
  quote: Quote;
};

export const createQuote = async ({
  companyId,
  clientId,
  projectId,
  ...rest
}: CreateQuoteArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/quote`,
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
      error = "There was an error creating this quote",
    } = caught;

    throw { status, error };
  }
};
