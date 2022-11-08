export declare type DeleteUserProjectArgs = {
    projectId: string;
};
export declare const deleteUserProject: ({ projectId, }: DeleteUserProjectArgs) => Promise<({
    code?: number | undefined;
} & import("../../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
