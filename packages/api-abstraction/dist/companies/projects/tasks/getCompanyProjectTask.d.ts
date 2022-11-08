import type { SearchArgs } from "../../../search/types";
export declare type GetCompanyProjectTaskArgs = SearchArgs & {
    projectId: string;
    companyId: string;
    taskId: string;
};
export declare const getCompanyProjectTask: ({ projectId, companyId, taskId, ...queryParams }: GetCompanyProjectTaskArgs) => Promise<any>;