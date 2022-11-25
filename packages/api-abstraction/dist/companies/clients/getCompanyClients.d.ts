import type { SearchArgs } from "../../search/types";
export type GetCompanyClientsArgs = SearchArgs;
export declare const getCompanyClients: ({ companyId, ...queryParams }: GetCompanyClientsArgs) => Promise<any>;
