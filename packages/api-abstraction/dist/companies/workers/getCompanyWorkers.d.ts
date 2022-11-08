import type { SearchArgs } from "../../search/types";
export declare type GetCompanyWorkersArgs = SearchArgs;
export declare const getCompanyWorkers: ({ companyId, ...queryParams }: GetCompanyWorkersArgs) => Promise<any>;
