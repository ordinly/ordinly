import type { SearchArgs } from "../../search/types";
export declare type GetUserProjectCompaniesArgs = SearchArgs & {
    projectId: string;
};
export declare const getUserProjectCompanies: ({ projectId, ...queryParams }: GetUserProjectCompaniesArgs) => Promise<any>;