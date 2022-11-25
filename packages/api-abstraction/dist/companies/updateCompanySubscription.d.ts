type UpdateCompanySubscriptionProps = {
    companyId: string;
};
export declare const updateCompanySubscription: ({ companyId, }: UpdateCompanySubscriptionProps) => Promise<import("../requests").APIResponse & {
    sessionURL: string;
}>;
export {};
