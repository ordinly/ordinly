export type City = {
    name: string;
};
export type GetCitiesResponse = {
    regions: City[];
};
export declare const getCities: ({ countryId, regionId, }: {
    countryId: string;
    regionId: string;
}) => Promise<any>;
