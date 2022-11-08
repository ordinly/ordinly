export declare type Status = {
    label: string;
    value: string;
};
export declare type GetStatusesResponse = {
    statuses: Status[];
};
export declare const getStatuses: () => Promise<any>;
