import { PUT } from "../../../../requests";

import type { Quote } from "./createQuote";

export type UpdateQuoteArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
  quoteId: string;
  quote: Quote;
};

export const updateQuote = async ({
  companyId,
  clientId,
  projectId,
  quoteId,
  ...rest
}: UpdateQuoteArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/clients/${clientId}/projects/${projectId}/quote/${quoteId}`,
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
      error = "There was an error updating this quote",
    } = caught;

    return { status, error };
  }
};
