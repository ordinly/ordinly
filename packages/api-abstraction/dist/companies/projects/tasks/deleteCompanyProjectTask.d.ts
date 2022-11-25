export type DeleteCompanyProjectTaskArgs = {
    companyId: string;
    projectId: string;
    taskId: string;
};
export declare const deleteCompanyProjectTask: ({ companyId, projectId, taskId, }: DeleteCompanyProjectTaskArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
