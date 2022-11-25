export type RevokeInvitationToCompanyProjectArgs = {
    invitationId: string;
    projectId: string;
    companyId: string;
};
export declare const revokeInvitationToCompanyProject: ({ projectId, invitationId, companyId, }: RevokeInvitationToCompanyProjectArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
