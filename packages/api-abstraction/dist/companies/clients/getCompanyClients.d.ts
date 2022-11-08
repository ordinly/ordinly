import type { SearchArgs } from "../../search/types";
export declare type GetCompanyClientsArgs = SearchArgs;
export declare const getCompanyClients: ({ companyId, ...queryParams }: GetCompanyClientsArgs) => Promise<any>;
