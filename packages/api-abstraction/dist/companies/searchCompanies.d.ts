import type { SearchArgs } from "../search/types";
export type SearchCompaniesArgs = SearchArgs;
export type SearchWorkCompany = {
    _id: string;
    name: string;
    description?: string;
};
export type SearchCompaniesCompaniesResponse = {
    companies: SearchWorkCompany[];
};
export declare const searchCompanies: (queryParams: SearchCompaniesArgs) => Promise<SearchCompaniesCompaniesResponse>;
