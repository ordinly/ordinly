export type UpdateTaskArgs = {
    taskId: string;
    companyId: string;
    clientId: string;
    projectId: string;
    name: string;
    dueDate?: string;
    description?: string;
    assignedWorkers?: string[];
    assignedTeams?: string[];
    assignedClients?: string[];
};
export declare const updateTask: ({ companyId, clientId, projectId, taskId, ...rest }: UpdateTaskArgs) => Promise<({
    code?: number | undefined;
} & import("../../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
