export type RemoveCompanyFromUserProjectArgs = {
    projectId: string;
    companyId: string;
};
export declare const removeCompanyFromPersonalProject: ({ projectId, companyId, }: RemoveCompanyFromUserProjectArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
