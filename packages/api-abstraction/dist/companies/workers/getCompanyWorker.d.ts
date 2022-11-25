export type GetCompanyWorkerArgs = {
    companyId: string;
    workerId: string;
};
export declare const getCompanyWorker: ({ companyId, workerId, }: GetCompanyWorkerArgs) => Promise<any>;
