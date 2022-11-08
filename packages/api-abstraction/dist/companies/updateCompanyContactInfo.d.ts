export declare type UpdateCompanyContactInfoArgs = {
    companyId: string;
    emailAddresses: string[];
};
export declare const updateCompanyContactInfo: ({ companyId, ...rest }: UpdateCompanyContactInfoArgs) => Promise<({
    code?: number | undefined;
} & import("../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
