export declare type CreateProjectArgs = {
    companyId: string;
    clientId: string;
    name: string;
    description: string;
    workers?: string[];
    teams?: string[];
};
export declare const createProject: ({ companyId, clientId, ...rest }: CreateProjectArgs) => Promise<import("../../../requests").APIResponse & {}>;
