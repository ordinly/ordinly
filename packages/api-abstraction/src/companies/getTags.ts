import { GET } from "../requests";

export type Tags = {
  tags: string[];
};

export const getTags = async () => {
  try {
    const response = await GET<Tags>({
      endpoint: `/api/company/tags`,
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
