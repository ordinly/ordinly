export type UpdateAccountArgs = {
    email: string;
    name: string;
};
export declare const updateAccount: (args: UpdateAccountArgs) => Promise<import("../requests").APIResponse & {}>;
