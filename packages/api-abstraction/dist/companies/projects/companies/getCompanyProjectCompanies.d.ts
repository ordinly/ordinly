import type { SearchArgs } from "../../../search/types";
export declare type GetCompanyProjectCompaniesArgs = SearchArgs & {
    projectId: string;
    companyId: string;
};
export declare const getCompanyProjectCompanies: ({ projectId, companyId, ...queryParams }: GetCompanyProjectCompaniesArgs) => Promise<any>;
