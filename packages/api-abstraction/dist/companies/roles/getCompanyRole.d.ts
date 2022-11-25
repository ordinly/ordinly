export type GetCompanyRoleArgs = {
    companyId: string;
    roleId: string;
};
export declare const getCompanyRole: ({ companyId, roleId, }: GetCompanyRoleArgs) => Promise<any>;
