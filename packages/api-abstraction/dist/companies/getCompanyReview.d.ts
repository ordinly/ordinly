export type CompanyReview = {
    _id: string;
    userId: string;
    companyId: string;
    details: string;
    rating: number;
};
export declare const getCompanyReview: ({ companyId, reviewId, }: {
    companyId: string;
    reviewId: string;
}) => Promise<any>;
