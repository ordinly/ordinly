import { PUT } from "../../../requests";

export const updateGoogleCalendarConfig = async (body: {
  syncedCalendars: string[];
}) => {
  try {
    const response = await PUT({
      endpoint: `/api/user/google-integration/calendar`,
      body,
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
