declare type SearchCompaniesArgs = {
    ids: string[];
};
declare type SearchWorkCompany = {
    _id: string;
    name: string;
    description?: string;
};
declare type SearchCompaniesCompaniesResponse = {
    companies: SearchWorkCompany[];
};
export declare const getCompaniesByIds: ({ ids, }: SearchCompaniesArgs) => Promise<SearchCompaniesCompaniesResponse>;
export {};
