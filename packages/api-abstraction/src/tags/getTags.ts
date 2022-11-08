import { GET } from "../requests";

export type Tag = {
  label: string;
  color: string;
};

export type GetTagsResponse = {
  tags: Tag[];
};

export const getAllTags = async () => {
  try {
    const response = await GET<GetTagsResponse>({
      endpoint: "/api/tags",
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these tags",
    } = caught;

    return { status, error };
  }
};