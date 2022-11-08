export declare type RemoveUserTaskArgs = {
    taskId: string;
    projectId: string;
};
export declare const removeUserTask: ({ projectId, taskId, }: RemoveUserTaskArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
