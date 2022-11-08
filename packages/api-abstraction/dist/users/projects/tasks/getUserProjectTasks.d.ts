import type { SearchArgs } from "../../../search/types";
export declare type GetUserProjectTasksArgs = SearchArgs & {
    projectId: string;
};
export declare const getUserProjectTasks: ({ projectId, ...queryParams }: GetUserProjectTasksArgs) => Promise<any>;
