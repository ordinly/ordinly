import type { SearchArgs } from "../../search/types";
export declare type GetCompanyClientContactssArgs = SearchArgs;
export declare const getCompanyClientContacts: ({ companyId, clientId, ...queryParams }: GetCompanyClientContactssArgs) => Promise<any>;
