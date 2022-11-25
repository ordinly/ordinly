export type UpdateCompanyProfilePicture = {
    companyId: string;
    file: any;
};
export declare const updateCompanyProfilePicture: ({ companyId, file, }: UpdateCompanyProfilePicture) => Promise<({
    code?: number | undefined;
} & import("../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
