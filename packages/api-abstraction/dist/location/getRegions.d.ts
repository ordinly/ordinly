export declare type Region = {
    name: string;
};
export declare type GetRegionsResponse = {
    regions: Region[];
};
export declare const getRegions: ({ countryId }: {
    countryId: string;
}) => Promise<any>;
