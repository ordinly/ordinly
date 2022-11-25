import type { Invoice } from "./createInvoice";
export type UpdateInvoiceArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    invoiceId: string;
    invoice: Invoice;
};
export declare const updateInvoice: ({ companyId, clientId, projectId, invoiceId, ...rest }: UpdateInvoiceArgs) => Promise<({
    code?: number | undefined;
} & import("../../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
