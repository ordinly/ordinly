import type { SearchArgs } from "../../search/types";
export declare type GetCompanyRolesArgs = SearchArgs;
export declare const getCompanyRoles: ({ companyId, ...queryParams }: GetCompanyRolesArgs) => Promise<any>;
