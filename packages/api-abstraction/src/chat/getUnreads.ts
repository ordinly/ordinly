import { GET } from "../requests";

export type CompanyUnread = {
  [key: string]: { [key: string]: number };
};

export type GetUnreadsArgs = {
  teamIds: string[];
};

export type GetUnreadsResponse = {
  unreads: {
    [key: string]: { [key: string]: number };
  };
};

export const getUnreads = async ({ teamIds }: GetUnreadsArgs) => {
  try {
    const response = await GET<GetUnreadsResponse>({
      endpoint: `/chat/user/get-unreads?teams=${teamIds.reduce(
        (total, teamId, index) => `${total}${index ? "," : ""}${teamId}`,
        ""
      )}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching your unread messages",
    } = caught;

    return { status, error };
  }
};
