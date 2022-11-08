export declare type CreateTeamArgs = {
    companyId: string;
    name: string;
    description?: string;
};
export declare const createTeam: ({ companyId, ...rest }: CreateTeamArgs) => Promise<import("../../requests").APIResponse & {}>;
