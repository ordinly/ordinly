import { GET } from "../requests";

export type Status = {
  label: string;
  value: string;
};

export type GetStatusesResponse = {
  statuses: Status[];
};

export const getStatuses = async () => {
  try {
    const response = await GET<GetStatusesResponse>({
      endpoint: "/api/projects/statuses",
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these statuses",
    } = caught;

    return { status, error };
  }
};
