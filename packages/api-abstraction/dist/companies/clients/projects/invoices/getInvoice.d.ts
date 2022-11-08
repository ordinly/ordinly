declare type GetClientInvoiceArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    invoiceId: string;
};
export declare type InvoiceType = {
    _id: string;
    client: string;
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
export declare type GetInvoiceResponse = {
    invoice: InvoiceType;
};
export declare const getProjectInvoice: ({ companyId, clientId, projectId, invoiceId, }: GetClientInvoiceArgs) => Promise<GetInvoiceResponse>;
export {};
