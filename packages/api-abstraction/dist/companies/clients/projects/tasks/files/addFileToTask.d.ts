export type AddFileToTask = {
    companyId: string;
    clientId: string;
    projectId: string;
    taskId: string;
    file: any;
};
export declare const addFileToTask: ({ companyId, clientId, projectId, taskId, file, }: AddFileToTask) => Promise<({
    code?: number | undefined;
} & import("../../../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
