import type { SearchArgs } from "../../search/types";
export type GetCompanyVendorsArgs = SearchArgs;
export declare const getCompanyVendors: ({ companyId, ...queryParams }: GetCompanyVendorsArgs) => Promise<any>;
