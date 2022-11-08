export declare type UpdateInvitationToPersonalProjectArgs = {
    invitationId: string;
    projectId: string;
    permissions: any;
};
export declare const updateInvitationToPersonalProject: ({ projectId, invitationId, permissions, }: UpdateInvitationToPersonalProjectArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
