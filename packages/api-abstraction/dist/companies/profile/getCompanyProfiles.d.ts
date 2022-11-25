import type { SearchArgs } from "../../search/types";
export type SearchCompanyProfilesArgs = SearchArgs;
export type SearchCompanyProfile = {
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
export type SearchCompanyProfilesResponse = {
    companies: SearchCompanyProfile[];
};
export declare const getCompanyProfiles: (queryParams: SearchCompanyProfilesArgs) => Promise<SearchCompanyProfilesResponse>;
