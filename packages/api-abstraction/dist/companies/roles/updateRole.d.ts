export declare type UpdateRoleArgs = {
    companyId: string;
    roleId: string;
    permissions: any;
    name: string;
    description: string;
};
export declare const updateRole: ({ companyId, roleId, ...role }: UpdateRoleArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
