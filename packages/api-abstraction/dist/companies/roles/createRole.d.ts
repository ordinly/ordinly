export type CreateRoleArgs = {
    companyId: string;
    name: string;
    description?: string;
    permissions: any;
};
export declare const createRole: ({ companyId, ...rest }: CreateRoleArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
