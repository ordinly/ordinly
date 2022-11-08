import { GET } from "../../requests";

import type { SearchArgs } from "../../search/types";

export type SearchCompanyProfilePostsArgs = SearchArgs;

export type SearchCompanyProfilePosts = {
  _id: string;
  title: string;
  images?: string[];
  postedAt: Date;
  likes: number;
  comments: string;
  tags: string;
  author: {
    _id: string;
    name: string;
  };
  content: string;
};

export type SearchCompanyProfilePostsResponse = {
  posts: SearchCompanyProfilePosts[];
};

export const getCompanyProfilePosts = async ({
  companyId,
  ...queryParams
}: SearchCompanyProfilePostsArgs): Promise<SearchCompanyProfilePostsResponse> => {
  try {
    const response = await GET<SearchCompanyProfilePostsResponse>({
      endpoint: `/api/company/${companyId}/profile/posts`,
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
      error = "There was an error searching these posts",
    } = caught;

    throw { status, error };
  }
};
