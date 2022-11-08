export declare type Country = {
    name: string;
    iso: string;
};
export declare type GetCountriesResponse = {
    countries: Country[];
};
export declare const getCountries: () => Promise<any>;
