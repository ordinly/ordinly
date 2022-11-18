import { tags } from "@db/static/tags.json";

import type { APIResponse } from "@contexts/shared/types";

type GetTagsResponse = {
  tags: string[];
};

export default async (): APIResponse<GetTagsResponse> => {
  try {
    return {
      status: 200,
      message: "Tags fetched",
      tags,
    };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these tags",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
