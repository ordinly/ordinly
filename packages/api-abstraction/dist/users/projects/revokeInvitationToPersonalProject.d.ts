export type RevokeInvitationToPersonalProjectArgs = {
    invitationId: string;
    projectId: string;
};
export declare const revokeInvitationToPersonalProject: ({ projectId, invitationId, }: RevokeInvitationToPersonalProjectArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
