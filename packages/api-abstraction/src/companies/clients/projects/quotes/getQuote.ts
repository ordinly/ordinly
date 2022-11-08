import { GET } from "../../../../requests";

type GetClientQuoteArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
  quoteId: string;
};

export type QuoteType = {
  _id: string;
  client: string;
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

export type GetQuoteResponse = {
  quote: QuoteType;
};

export const getProjectQuote = async ({
  companyId,
  clientId,
  projectId,
  quoteId,
}: GetClientQuoteArgs): Promise<GetQuoteResponse> => {
  try {
    const response = await GET<GetQuoteResponse>({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/quote/${quoteId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching this quote",
    } = caught;

    throw { status, error };
  }
};
