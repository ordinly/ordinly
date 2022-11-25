import type { SearchArgs } from "../../search/types";
export type GetCompanyRolesArgs = SearchArgs;
export declare const getCompanyRoles: ({ companyId, ...queryParams }: GetCompanyRolesArgs) => Promise<any>;
