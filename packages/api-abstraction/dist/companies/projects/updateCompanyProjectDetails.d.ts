export type UpdateCompanyProjectDetailsArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    name: string;
    description: string;
    owner: string;
};
export declare const updateCompanyProjectDetails: ({ projectId, companyId, ...rest }: UpdateCompanyProjectDetailsArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
