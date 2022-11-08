import { DELETE } from "../../../../requests";

export type DeleteQuoteArgs = {
  companyId: string;
  clientId: string;
  projectId: string;
  quoteId: string;
};

export const deleteQuote = async ({
  companyId,
  clientId,
  projectId,
  quoteId,
}: DeleteQuoteArgs) => {
  try {
    const response = await DELETE({
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
      error = "There was an error deleting this quote",
    } = caught;

    return { status, error };
  }
};
