export declare type DeleteClientArgs = {
    companyId: string;
    clientId: string;
};
export declare const deleteClient: ({ companyId, clientId, }: DeleteClientArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
