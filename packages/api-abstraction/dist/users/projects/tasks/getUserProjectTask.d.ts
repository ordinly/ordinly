export type GetUserProjectTaskArgs = {
    projectId: string;
    taskId: string;
};
export declare const getUserProjectTask: ({ projectId, taskId, }: GetUserProjectTaskArgs) => Promise<any>;
