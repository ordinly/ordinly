export declare type UpdateCompanyPhoneNumbersArgs = {
    companyId: string;
    phoneNumbers: string[];
};
export declare const updateCompanyPhoneNumbers: ({ companyId, ...rest }: UpdateCompanyPhoneNumbersArgs) => Promise<({
    code?: number | undefined;
} & import("../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
