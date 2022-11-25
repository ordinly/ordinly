export type Priority = {
    label: string;
    value: string;
};
export type GetPrioritiesResponse = {
    priorities: Priority[];
};
export declare const getPriorities: () => Promise<any>;
