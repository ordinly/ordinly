export type Status = {
    label: string;
    value: string;
};
export type GetStatusesResponse = {
    statuses: Status[];
};
export declare const getStatuses: () => Promise<any>;
