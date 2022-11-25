export type AddUserTaskArgs = {
    projectId: string;
    name: string;
    dueDate?: string;
    description?: string;
    assignedVendors?: string[];
};
export declare const addUserTask: ({ projectId, ...rest }: AddUserTaskArgs) => Promise<import("../../../requests").APIResponse & {}>;
