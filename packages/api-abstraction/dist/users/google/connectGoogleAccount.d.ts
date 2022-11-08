export declare type ConnectGoogleAccountArgs = {
    scope: string | string[];
};
export declare const connectGoogleAccount: (args: ConnectGoogleAccountArgs) => Promise<import("../../requests").APIResponse & {
    url: string;
}>;
