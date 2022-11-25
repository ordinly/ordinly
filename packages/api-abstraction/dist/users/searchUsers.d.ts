import type { SearchArgs } from "../search/types";
export type SearchUsersArgs = SearchArgs;
export type SearchUser = {
    _id: string;
    name: string;
    email: string;
};
export type SearchUsersResponse = {
    companies: SearchUser[];
};
export declare const searchUsers: (queryParams: SearchUsersArgs) => Promise<SearchUsersResponse>;
