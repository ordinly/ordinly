export declare type GetCompanyTeamArgs = {
    companyId: string;
    teamId: string;
};
export declare const getCompanyTeam: ({ companyId, teamId, }: GetCompanyTeamArgs) => Promise<any>;
