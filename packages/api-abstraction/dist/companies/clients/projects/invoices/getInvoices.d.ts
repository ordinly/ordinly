declare type GetClientInvoicesArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
};
export declare type ClientInvoice = {
    _id: string;
    issueDate: Date;
    dueDate: Date;
    invoiceNumber: string;
    total: number;
};
export declare type GetInvoicesResponse = {
    invoices: ClientInvoice[];
};
export declare const getClientInvoices: ({ companyId, clientId, projectId, }: GetClientInvoicesArgs) => Promise<GetInvoicesResponse>;
export {};
