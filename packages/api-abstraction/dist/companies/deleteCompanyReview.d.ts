export type DeleteCompanyReviewArgs = {
    companyId: string;
    reviewId: string;
};
export declare const deleteCompanyReview: ({ companyId, reviewId, }: DeleteCompanyReviewArgs) => Promise<({
    code?: number | undefined;
} & import("../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
