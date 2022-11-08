export declare type UpdateClientDetailsArgs = {
    companyId: string;
    clientId: string;
    name: string;
    description: string;
};
export declare const updateClientDetails: ({ companyId, clientId, ...rest }: UpdateClientDetailsArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
