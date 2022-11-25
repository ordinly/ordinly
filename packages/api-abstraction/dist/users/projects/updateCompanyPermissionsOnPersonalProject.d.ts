export type UpdateUserCompanyPermissionsArgs = {
    companyId: string;
    projectId: string;
    permissions: any;
};
export declare const updateCompanyPermissionsOnPersonalProject: ({ projectId, companyId, permissions, }: UpdateUserCompanyPermissionsArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
