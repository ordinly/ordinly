export type DeleteCompanyArgs = {
    companyId: string;
};
export declare const deleteCompany: ({ companyId }: DeleteCompanyArgs) => Promise<({
    code?: number | undefined;
} & import("../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
