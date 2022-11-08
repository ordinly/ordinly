import type { SearchArgs } from "../../search/types";
export declare type SearchCompanyProfilesArgs = SearchArgs;
export declare type SearchCompanyProfile = {
    _id: string;
    name: string;
    tagline?: string;
    tags?: string[];
    rating: {
        numberOfReviews: number;
        rating: number;
    };
    location?: {
        country?: string;
        region?: string;
        city?: string;
        streetAddress?: string;
    };
};
export declare type SearchCompanyProfilesResponse = {
    companies: SearchCompanyProfile[];
};
export declare const getCompanyProfiles: (queryParams: SearchCompanyProfilesArgs) => Promise<SearchCompanyProfilesResponse>;
