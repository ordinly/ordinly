import { GET } from "../requests";

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

export const searchUsers = async (
  queryParams: SearchUsersArgs
): Promise<SearchUsersResponse> => {
  try {
    const response = await GET<SearchUsersResponse>({
      endpoint: `/api/user/search`,
      queryParams,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error searching for users",
    } = caught;

    throw { status, error };
  }
};
