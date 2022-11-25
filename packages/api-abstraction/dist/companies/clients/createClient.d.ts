export type CreateClientArgs = {
    companyId: string;
    description?: string;
    constacts: {
        name: string;
        emailAddress: string;
        phoneNumber: string;
    }[];
} & ({
    company: string;
} | {
    name: string;
    email: string;
    address?: {
        country?: string;
        region?: string;
        city?: string;
        postalCode?: string;
        streetAddress?: string;
    };
});
export declare const createClient: ({ companyId, ...rest }: CreateClientArgs) => Promise<import("../../requests").APIResponse & {}>;
