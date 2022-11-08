export declare type CreateCompanyProjectTaskArgs = {
    projectId: string;
    companyId: string;
    name: string;
    dueDate?: string;
    description?: string;
    assignedCompany?: string;
    assignedTeam?: string;
    assignedWorker?: string;
};
export declare const createCompanyProjectTask: ({ companyId, projectId, ...rest }: CreateCompanyProjectTaskArgs) => Promise<import("../../../requests").APIResponse & {}>;
