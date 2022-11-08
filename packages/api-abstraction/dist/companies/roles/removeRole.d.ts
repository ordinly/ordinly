export declare type RemoveRoleArgs = {
    companyId: string;
    roleId: string;
};
export declare const removeRole: ({ companyId, roleId }: RemoveRoleArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
