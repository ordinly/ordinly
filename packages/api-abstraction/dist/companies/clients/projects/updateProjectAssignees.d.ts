export declare type UpdateProjectAssigneesArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    assignedWorkers: string[];
    assignedTeams: string[];
};
export declare const updateProjectAssignees: ({ companyId, clientId, projectId, ...rest }: UpdateProjectAssigneesArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
