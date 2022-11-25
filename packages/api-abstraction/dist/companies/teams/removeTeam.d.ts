export type RemoveTeamArgs = {
    companyId: string;
    teamId: string;
};
export declare const removeTeam: ({ companyId, teamId }: RemoveTeamArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
