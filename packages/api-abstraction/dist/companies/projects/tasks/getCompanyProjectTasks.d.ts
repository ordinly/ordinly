import type { SearchArgs } from "../../../search/types";
export declare type GetCompanyProjectTasksArgs = SearchArgs & {
    projectId: string;
    companyId: string;
};
export declare const getCompanyProjectTasks: ({ projectId, companyId, ...queryParams }: GetCompanyProjectTasksArgs) => Promise<any>;