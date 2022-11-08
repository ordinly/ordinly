export declare type RevokeInvitationArgs = {
    companyId: string;
    invitationId: string;
};
export declare const revokeInvitation: ({ companyId, invitationId, }: RevokeInvitationArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
