import type { SearchArgs } from "../search/types";
export declare type SearchUsersArgs = SearchArgs;
export declare type SearchUser = {
    _id: string;
    name: string;
    email: string;
};
export declare type SearchUsersResponse = {
    companies: SearchUser[];
};
export declare const searchUsers: (queryParams: SearchUsersArgs) => Promise<SearchUsersResponse>;
