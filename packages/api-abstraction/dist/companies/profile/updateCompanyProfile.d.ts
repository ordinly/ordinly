export type UpdateCompanyProfileArgs = {
    companyId: string;
    [key: string]: any;
};
export declare const updateCompanyProfile: ({ companyId, ...body }: UpdateCompanyProfileArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
