export type InviteCompaniesToCompanyProjectArgs = {
    invitations: string[];
    projectId: string;
    companyId: string;
};
export declare const inviteCompaniesToCompanyProject: ({ projectId, companyId, ...rest }: InviteCompaniesToCompanyProjectArgs) => Promise<import("../../../requests").APIResponse & {}>;
