export declare type UpdateCompanyOwnerArgs = {
    companyId: string;
    onChangeOwner: "change-role" | "leave-company";
    newOwner: string;
    newRole?: string;
};
export declare const updateCompanyOwner: ({ companyId, ...rest }: UpdateCompanyOwnerArgs) => Promise<({
    code?: number | undefined;
} & import("../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
