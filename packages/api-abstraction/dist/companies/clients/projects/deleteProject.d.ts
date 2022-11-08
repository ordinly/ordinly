export declare type DeleteProjectArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
};
export declare const deleteProject: ({ companyId, clientId, projectId, }: DeleteProjectArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
