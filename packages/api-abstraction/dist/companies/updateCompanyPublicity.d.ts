export type UpdateCompanyPublicityArgs = {
    companyId: string;
    public: boolean;
};
export declare const updateCompanyPublicity: ({ companyId, ...rest }: UpdateCompanyPublicityArgs) => Promise<({
    code?: number | undefined;
} & import("../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
