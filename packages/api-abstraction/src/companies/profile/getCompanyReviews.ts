import { GET } from "../../requests";

import type { SearchArgs } from "../../search/types";

export type SearchCompanyProfileReviewsArgs = SearchArgs;

export type SearchCompanyProfileReviews = {
  _id: string;
  title: string;
  images?: string[];
  reviewedAt: Date;
  likes: number;
  comments: string;
  author: {
    _id: string;
    name: string;
  };
};

export type SearchCompanyProfileReviewsResponse = {
  reviews: SearchCompanyProfileReviews[];
};

export const getCompanyProfileReviews = async ({
  companyId,
  ...queryParams
}: SearchCompanyProfileReviewsArgs): Promise<SearchCompanyProfileReviewsResponse> => {
  try {
    const response = await GET<SearchCompanyProfileReviewsResponse>({
      endpoint: `/api/company/${companyId}/profile/reviews`,
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
      error = "There was an error searching these reviews",
    } = caught;

    throw { status, error };
  }
};
