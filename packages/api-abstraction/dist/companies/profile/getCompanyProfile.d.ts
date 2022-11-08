export declare type CompanyProfile = {
    _id: string;
    name: string;
    tagline?: string;
    description?: string;
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
export declare const getCompanyProfile: ({ companyId, }: {
    companyId: string;
}) => Promise<any>;
