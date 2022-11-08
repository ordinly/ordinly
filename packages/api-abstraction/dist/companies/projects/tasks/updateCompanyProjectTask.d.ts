export declare type UpdateCompanyProjectTaskDetailsArgs = {
    taskId: string;
    projectId: string;
    companyId: string;
    name: string;
    dueDate?: string;
    description?: string;
    assignedCompany?: string;
    assignedTeam?: string;
    assignedWorker?: string;
};
export declare const updateCompanyProjectTaskDetails: ({ projectId, companyId, taskId, ...rest }: UpdateCompanyProjectTaskDetailsArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
