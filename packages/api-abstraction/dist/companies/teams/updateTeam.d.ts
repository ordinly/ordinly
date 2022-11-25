export type UpdateTeamArgs = {
    companyId: string;
    teamId: string;
    members: string[];
    name: string;
    description: string;
};
export declare const updateTeam: ({ companyId, teamId, ...role }: UpdateTeamArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
