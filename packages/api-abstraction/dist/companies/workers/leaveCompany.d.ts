export declare type leaveCompanyArgs = {
    companyId: string;
};
export declare const leaveCompany: ({ companyId }: leaveCompanyArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
