import { GET } from "../../../requests";

export const getGoogleCalendars = async () => {
  try {
    const response = await GET({
      endpoint: `/api/user/google-integration/calendar`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error getting your Google Calendars",
    } = caught;

    throw { status, error };
  }
};
