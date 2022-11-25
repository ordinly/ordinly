export type RemoveTaskArgs = {
    taskId: string;
    companyId: string;
    clientId: string;
    projectId: string;
};
export declare const removeTask: ({ companyId, clientId, projectId, taskId, }: RemoveTaskArgs) => Promise<({
    code?: number | undefined;
} & import("../../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
