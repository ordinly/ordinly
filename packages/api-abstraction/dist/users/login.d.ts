export declare type LoginArgs = {
    email: string;
    password: string;
};
export declare type LoginResponse = {
    user: any;
};
export declare const login: (args: LoginArgs) => Promise<import("../requests").APIResponse & LoginResponse>;
