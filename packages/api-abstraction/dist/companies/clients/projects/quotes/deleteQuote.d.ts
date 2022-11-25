export type DeleteQuoteArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    quoteId: string;
};
export declare const deleteQuote: ({ companyId, clientId, projectId, quoteId, }: DeleteQuoteArgs) => Promise<({
    code?: number | undefined;
} & import("../../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
