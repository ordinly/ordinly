export type UpdateUserProjectDetailsArgs = {
    companyId: string;
    clientId: string;
    projectId: string;
    name: string;
    description: string;
    owner: string;
};
export declare const updateUserProjectDetails: ({ projectId, ...rest }: UpdateUserProjectDetailsArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
