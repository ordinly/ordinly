export type UpdateInvitationArgs = {
    companyId: string;
    invitationId: string;
    roleId: string;
};
export declare const updateInvitation: ({ companyId, invitationId, roleId, }: UpdateInvitationArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
