export declare type RemoveCompanyFromCompanyProjectArgs = {
    projectId: string;
    companyId: string;
    invitedCompanyId: string;
};
export declare const removeCompanyFromCompanyProject: ({ projectId, companyId, invitedCompanyId, }: RemoveCompanyFromCompanyProjectArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
