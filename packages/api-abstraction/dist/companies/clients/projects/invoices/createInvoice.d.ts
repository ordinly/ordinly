export declare type Invoice = {
    client: string;
    clientId: string;
    invoiceNumber: string;
    issueDate: Date;
    dueDate: Date;
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
export declare type CreateInvoiceArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    invoice: Invoice;
};
export declare const createInvoice: ({ companyId, clientId, projectId, ...rest }: CreateInvoiceArgs) => Promise<import("../../../../requests").APIResponse & {}>;
