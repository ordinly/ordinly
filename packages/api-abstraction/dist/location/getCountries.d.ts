export type Country = {
    name: string;
    iso: string;
};
export type GetCountriesResponse = {
    countries: Country[];
};
export declare const getCountries: () => Promise<any>;
