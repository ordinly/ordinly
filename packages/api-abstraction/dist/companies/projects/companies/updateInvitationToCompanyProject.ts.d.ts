export declare type UpdateInvitationToCompanyProjectArgs = {
    invitationId: string;
    projectId: string;
    permissions: any;
    companyId: string;
};
export declare const updateInvitationToCompanyProject: ({ projectId, invitationId, permissions, companyId, }: UpdateInvitationToCompanyProjectArgs) => Promise<({
    code?: number | undefined;
} & import("../../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
