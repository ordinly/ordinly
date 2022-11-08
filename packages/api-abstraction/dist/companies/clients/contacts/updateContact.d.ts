export declare type UpdateContactArgs = {
    companyId: string;
    clientId: string;
    contactId: string;
    name: string;
    role?: string;
    email?: string;
    phoneNumber?: number;
    notes?: string[];
    files?: string[];
};
export declare const updateContact: ({ companyId, clientId, contactId, ...rest }: UpdateContactArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
