export type CompanyUnread = {
    [key: string]: {
        [key: string]: number;
    };
};
export type GetUnreadsArgs = {
    teamIds: string[];
};
export type GetUnreadsResponse = {
    unreads: {
        [key: string]: {
            [key: string]: number;
        };
    };
};
export declare const getUnreads: ({ teamIds }: GetUnreadsArgs) => Promise<any>;
