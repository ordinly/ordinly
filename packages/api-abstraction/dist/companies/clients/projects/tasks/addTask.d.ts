export declare type AddTaskArgs = {
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
export declare const addTask: ({ companyId, clientId, projectId, ...rest }: AddTaskArgs) => Promise<import("../../../../requests").APIResponse & {}>;
