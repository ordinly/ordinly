export type AddContactArgs = {
    companyId: string;
    clientId: string;
    name: string;
    role?: string;
    email?: string;
    phoneNumber?: number;
    notes?: string[];
    files?: string[];
};
export declare const addContact: ({ companyId, clientId, ...rest }: AddContactArgs) => Promise<import("../../../requests").APIResponse & {}>;
