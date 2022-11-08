export declare type RespondToInvitationArgs = {
    companyId: string;
    invitationId: string;
    accepted: boolean;
};
export declare const respondToInvitation: ({ companyId, invitationId, ...rest }: RespondToInvitationArgs) => Promise<import("../../requests").APIResponse & {}>;
