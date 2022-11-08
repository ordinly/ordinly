export declare type CreateCompanyProjectArgs = {
    companyId: string;
    name: string;
    description: string;
    workers?: string[];
    teams?: string[];
};
export declare const createCompanyProject: ({ companyId, ...rest }: CreateCompanyProjectArgs) => Promise<import("../../requests").APIResponse & {}>;
