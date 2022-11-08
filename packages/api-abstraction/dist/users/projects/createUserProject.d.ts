export declare type CreateUserProjectArgs = {
    name: string;
    description: string;
};
export declare const createUserProject: ({ ...rest }: CreateUserProjectArgs) => Promise<import("../../requests").APIResponse & {}>;
