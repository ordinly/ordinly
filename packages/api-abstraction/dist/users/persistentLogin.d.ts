export type PersistentLoginResponse = {
    user: any;
};
export declare const persistentLogin: () => Promise<import("../requests").APIResponse & PersistentLoginResponse>;
