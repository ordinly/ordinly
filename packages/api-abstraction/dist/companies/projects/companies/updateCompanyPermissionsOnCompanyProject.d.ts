export type UpdateCompanyPermissionsArgs = {
    companyId: string;
    projectId: string;
    permissions: any;
    invitedCompanyId: string;
};
export declare const updateCompanyPermissionsOnCompanyProject: ({ projectId, companyId, permissions, invitedCompanyId, }: UpdateCompanyPermissionsArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
