import type { SearchArgs } from "../../search/types";
export type GetCompanyProjectsArgs = SearchArgs;
export declare const getCompanyProjects: ({ companyId, ...queryParams }: GetCompanyProjectsArgs) => Promise<any>;
