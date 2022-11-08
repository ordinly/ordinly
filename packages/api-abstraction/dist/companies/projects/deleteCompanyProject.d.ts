export declare type DeleteCompanyProjectArgs = {
    companyId: string;
    projectId: string;
};
export declare const deleteCompanyProject: ({ companyId, projectId, }: DeleteCompanyProjectArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
