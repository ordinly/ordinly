import type { SearchArgs } from "../../search/types";
export type GetCompanyTeamsArgs = SearchArgs;
export declare const getCompanyTeams: ({ companyId, ...queryParams }: GetCompanyTeamsArgs) => Promise<any>;
