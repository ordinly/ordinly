export type UpdateCompanyEmailAddressesArgs = {
    companyId: string;
    emailAddresses: string[];
};
export declare const updateCompanyEmailAddresses: ({ companyId, ...rest }: UpdateCompanyEmailAddressesArgs) => Promise<({
    code?: number | undefined;
} & import("../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
