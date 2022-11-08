export declare type City = {
    name: string;
};
export declare type GetCitiesResponse = {
    regions: City[];
};
export declare const getCities: ({ countryId, regionId, }: {
    countryId: string;
    regionId: string;
}) => Promise<any>;
