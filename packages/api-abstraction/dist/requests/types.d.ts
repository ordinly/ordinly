export declare type APIResponseSuccess = {
    message?: string;
};
export declare type APIResponseError = {
    error?: string;
};
export declare type APIResponse = {
    code?: number;
} & (APIResponseSuccess | APIResponseError);
