export declare const updateCompanyReview: ({ companyId, reviewId, ...body }: {
    companyId: string;
    reviewId: string;
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
