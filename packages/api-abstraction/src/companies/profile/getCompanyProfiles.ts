import { GET } from "../../requests";

import type { SearchArgs } from "../../search/types";

export type SearchCompanyProfilesArgs = SearchArgs;

export type SearchCompanyProfile = {
  _id: string;
  name: string;
  tagline?: string;
  tags?: string[];
  rating: { numberOfReviews: number; rating: number };
  location?: {
    country?: string;
    region?: string;
    city?: string;
    streetAddress?: string;
  };
};

export type SearchCompanyProfilesResponse = {
  companies: SearchCompanyProfile[];
};

export const getCompanyProfiles = async (
  queryParams: SearchCompanyProfilesArgs
): Promise<SearchCompanyProfilesResponse> => {
  try {
    const response = await GET<SearchCompanyProfilesResponse>({
      endpoint: `/api/company/profiles/search`,
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
      error = "There was an error searching for companies",
    } = caught;

    throw { status, error };
  }
};
