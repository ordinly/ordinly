export declare type UpdateCompanyDetailsArgs = {
    companyId: string;
    name: string;
    description: string;
    owner: string;
    public: boolean;
};
export declare const updateCompanyDetails: ({ companyId, ...rest }: UpdateCompanyDetailsArgs) => Promise<({
    code?: number | undefined;
} & import("../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
