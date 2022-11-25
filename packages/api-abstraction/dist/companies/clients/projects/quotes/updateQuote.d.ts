import type { Quote } from "./createQuote";
export type UpdateQuoteArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    quoteId: string;
    quote: Quote;
};
export declare const updateQuote: ({ companyId, clientId, projectId, quoteId, ...rest }: UpdateQuoteArgs) => Promise<({
    code?: number | undefined;
} & import("../../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
