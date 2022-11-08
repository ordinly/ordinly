export declare type UpdateProjectDetailsArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    name: string;
    description: string;
    owner: string;
};
export declare const updateProjectDetails: ({ companyId, clientId, projectId, ...rest }: UpdateProjectDetailsArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
