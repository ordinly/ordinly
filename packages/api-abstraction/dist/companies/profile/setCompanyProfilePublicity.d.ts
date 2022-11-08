export declare type UpdateCompanyProfilePublicityArgs = {
    companyId: string;
    public: boolean;
};
export declare const updateCompanyProfilePublicity: ({ companyId, ...body }: UpdateCompanyProfilePublicityArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
