export type InviteWorkersArgs = {
    _id: string;
    invitations: string[];
};
export declare const inviteWorkers: ({ _id, ...rest }: InviteWorkersArgs) => Promise<import("../../requests").APIResponse & {}>;
