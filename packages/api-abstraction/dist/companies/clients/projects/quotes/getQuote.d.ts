type GetClientQuoteArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    quoteId: string;
};
export type QuoteType = {
    _id: string;
    client: string;
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
export type GetQuoteResponse = {
    quote: QuoteType;
};
export declare const getProjectQuote: ({ companyId, clientId, projectId, quoteId, }: GetClientQuoteArgs) => Promise<GetQuoteResponse>;
export {};
