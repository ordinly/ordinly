type SearchCompaniesArgs = {
    ids: string[];
};
type SearchWorkCompany = {
    _id: string;
    name: string;
    description?: string;
};
type SearchCompaniesCompaniesResponse = {
    companies: SearchWorkCompany[];
};
export declare const getCompaniesByIds: ({ ids, }: SearchCompaniesArgs) => Promise<SearchCompaniesCompaniesResponse>;
export {};
