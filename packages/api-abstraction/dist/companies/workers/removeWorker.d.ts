export declare type RemoveWorkerArgs = {
    companyId: string;
    workerId: string;
};
export declare const removeWorker: ({ companyId, workerId, }: RemoveWorkerArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
