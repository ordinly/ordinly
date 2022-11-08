import type { SearchArgs } from "../../search/types";
export declare type GetUserProjectsArgs = SearchArgs;
export declare const getUserProjects: (queryParams: GetUserProjectsArgs) => Promise<any>;
