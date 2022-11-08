export declare type DeleteInvoiceArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    invoiceId: string;
};
export declare const deleteInvoice: ({ companyId, clientId, projectId, invoiceId, }: DeleteInvoiceArgs) => Promise<({
    code?: number | undefined;
} & import("../../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
