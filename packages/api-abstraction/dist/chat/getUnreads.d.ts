export declare type CompanyUnread = {
    [key: string]: {
        [key: string]: number;
    };
};
export declare type GetUnreadsArgs = {
    teamIds: string[];
};
export declare type GetUnreadsResponse = {
    unreads: {
        [key: string]: {
            [key: string]: number;
        };
    };
};
export declare const getUnreads: ({ teamIds }: GetUnreadsArgs) => Promise<any>;
