export type UpdateUserTaskArgs = {
    taskId: string;
    projectId: string;
    name: string;
    dueDate?: string;
    description?: string;
    assignedVendors?: string[];
};
export declare const updateUserTask: ({ projectId, taskId, ...rest }: UpdateUserTaskArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
