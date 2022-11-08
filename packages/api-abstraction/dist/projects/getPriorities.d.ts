export declare type Priority = {
    label: string;
    value: string;
};
export declare type GetPrioritiesResponse = {
    priorities: Priority[];
};
export declare const getPriorities: () => Promise<any>;
