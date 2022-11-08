export declare type InviteCompaniesToPersonalProjectArgs = {
    invitations: string[];
    projectId: string;
};
export declare const inviteCompaniesToPersonalProject: ({ projectId, ...rest }: InviteCompaniesToPersonalProjectArgs) => Promise<import("../../requests").APIResponse & {}>;
