import { GET } from "../requests";

export type GetCompanyEventsArgs = {
  companyId: string;
  start?: Date;
  end?: Date;
};

export const getCompanyEvents = async ({
  companyId,
  start,
  end,
}: GetCompanyEventsArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/events?${
        start ? `start=${start}` : ""
      }${start ? "&" : ""}${end ? `end=${end}` : ""}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching your company events",
    } = caught;

    throw { status, error };
  }
};
