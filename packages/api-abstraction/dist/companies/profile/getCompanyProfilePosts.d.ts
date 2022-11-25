import type { SearchArgs } from "../../search/types";
export type SearchCompanyProfilePostsArgs = SearchArgs;
export type SearchCompanyProfilePosts = {
    _id: string;
    title: string;
    images?: string[];
    postedAt: Date;
    likes: number;
    comments: string;
    tags: string;
    author: {
        _id: string;
        name: string;
    };
    content: string;
};
export type SearchCompanyProfilePostsResponse = {
    posts: SearchCompanyProfilePosts[];
};
export declare const getCompanyProfilePosts: ({ companyId, ...queryParams }: SearchCompanyProfilePostsArgs) => Promise<SearchCompanyProfilePostsResponse>;
