export type UpdateWorkerArgs = {
    companyId: string;
    workerId: string;
    role: string;
    status: string;
};
export declare const updateWorker: ({ companyId, workerId, role, status, }: UpdateWorkerArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
