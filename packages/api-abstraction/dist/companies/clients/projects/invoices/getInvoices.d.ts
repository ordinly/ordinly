type GetClientInvoicesArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
};
export type ClientInvoice = {
    _id: string;
    issueDate: Date;
    dueDate: Date;
    invoiceNumber: string;
    total: number;
};
export type GetInvoicesResponse = {
    invoices: ClientInvoice[];
};
export declare const getClientInvoices: ({ companyId, clientId, projectId, }: GetClientInvoicesArgs) => Promise<GetInvoicesResponse>;
export {};
