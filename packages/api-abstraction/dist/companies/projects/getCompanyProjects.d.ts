import type { SearchArgs } from "../../search/types";
export declare type GetCompanyProjectsArgs = SearchArgs;
export declare const getCompanyProjects: ({ companyId, ...queryParams }: GetCompanyProjectsArgs) => Promise<any>;
