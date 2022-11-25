type SubscriptionProps = {
    companyId: string;
};
export declare const subscribe: ({ companyId }: SubscriptionProps) => Promise<import("../requests").APIResponse & {
    sessionId: string;
}>;
export {};
