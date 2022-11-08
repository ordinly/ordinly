export declare type UpdateGoogleTokensArgs = {
    scope: string | string[];
    code: string;
};
export declare const updateGoogleTokens: (args: UpdateGoogleTokensArgs) => Promise<import("../../requests").APIResponse & {}>;
