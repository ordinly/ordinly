import type { SearchArgs } from "../../search/types";
export type GetUserProjectsArgs = SearchArgs;
export declare const getUserProjects: (queryParams: GetUserProjectsArgs) => Promise<any>;
