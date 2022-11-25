import type { SearchArgs } from "../../search/types";
export type GetCompanyWorkersArgs = SearchArgs;
export declare const getCompanyWorkers: ({ companyId, ...queryParams }: GetCompanyWorkersArgs) => Promise<any>;
