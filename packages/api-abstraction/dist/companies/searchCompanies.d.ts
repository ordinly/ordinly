import type { SearchArgs } from "../search/types";
export declare type SearchCompaniesArgs = SearchArgs;
export declare type SearchWorkCompany = {
    _id: string;
    name: string;
    description?: string;
};
export declare type SearchCompaniesCompaniesResponse = {
    companies: SearchWorkCompany[];
};
export declare const searchCompanies: (queryParams: SearchCompaniesArgs) => Promise<SearchCompaniesCompaniesResponse>;
