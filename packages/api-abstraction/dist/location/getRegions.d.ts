export type Region = {
    name: string;
};
export type GetRegionsResponse = {
    regions: Region[];
};
export declare const getRegions: ({ countryId }: {
    countryId: string;
}) => Promise<any>;
