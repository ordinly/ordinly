export declare type SignUpArgs = {
    email: string;
    name: string;
    password: string;
};
export declare const signUp: (args: SignUpArgs) => Promise<({
    code?: number | undefined;
} & import("../requests").APIResponseSuccess) | ({
    code?: number | undefined;
} & import("../requests").APIResponseError) | {
    status: any;
    error: any;
}>;
