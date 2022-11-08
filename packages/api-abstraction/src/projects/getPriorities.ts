import { GET } from "../requests";

export type Priority = {
  label: string;
  value: string;
};

export type GetPrioritiesResponse = {
  priorities: Priority[];
};

export const getPriorities = async () => {
  try {
    const response = await GET<GetPrioritiesResponse>({
      endpoint: "/api/projects/priorities",
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these priorities",
    } = caught;

    return { status, error };
  }
};
