export declare const reviewCompany: ({ companyId, ...body }: {
    companyId: string;
} & {
    [key: string]: any;
}) => Promise<({
    code?: number | undefined;
} & import("../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
