export type RemoveContactArgs = {
    companyId: string;
    clientId: string;
    contactId: string;
};
export declare const removeContact: ({ companyId, clientId, contactId, }: RemoveContactArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
