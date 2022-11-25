export type AddCommentArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    taskId: string;
    text: string;
};
export declare const addComment: ({ companyId, clientId, projectId, taskId, ...rest }: AddCommentArgs) => Promise<({
    code?: number | undefined;
} & import("../../../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
