export declare type RemoveFileFromTaskArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    taskId: string;
    fileId: string;
};
export declare const removeFileFromTask: ({ companyId, clientId, projectId, taskId, fileId, }: RemoveFileFromTaskArgs) => Promise<({
    code?: number | undefined;
} & import("../../../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
