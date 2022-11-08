export declare type Quote = {
    isEstimate: boolean;
    client: string;
    clientId: string;
    quoteNumber: string;
    quoteDate: Date;
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
export declare type CreateQuoteArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    quote: Quote;
};
export declare const createQuote: ({ companyId, clientId, projectId, ...rest }: CreateQuoteArgs) => Promise<import("../../../../requests").APIResponse & {}>;
