import type { SearchArgs } from "../../search/types";
export type SearchCompanyProfileReviewsArgs = SearchArgs;
export type SearchCompanyProfileReviews = {
    _id: string;
    title: string;
    images?: string[];
    reviewedAt: Date;
    likes: number;
    comments: string;
    author: {
        _id: string;
        name: string;
    };
};
export type SearchCompanyProfileReviewsResponse = {
    reviews: SearchCompanyProfileReviews[];
};
export declare const getCompanyProfileReviews: ({ companyId, ...queryParams }: SearchCompanyProfileReviewsArgs) => Promise<SearchCompanyProfileReviewsResponse>;
