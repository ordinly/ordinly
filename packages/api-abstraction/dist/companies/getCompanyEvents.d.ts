export type GetCompanyEventsArgs = {
    companyId: string;
    start?: Date;
    end?: Date;
};
export declare const getCompanyEvents: ({ companyId, start, end, }: GetCompanyEventsArgs) => Promise<any>;
