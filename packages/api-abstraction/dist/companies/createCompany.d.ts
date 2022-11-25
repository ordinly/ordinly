export type CreateCompanyArgs = {
    name: string;
    description?: string;
    invitations: string[];
};
export declare const createCompany: (args: CreateCompanyArgs) => Promise<({
    code?: number | undefined;
} & import("../requests").APIResponseSuccess & {
    companyId: string;
}) | ({
    code?: number | undefined;
} & import("../requests").APIResponseError & {
    companyId: string;
}) | {
    status: any;
    error: any;
}>;
