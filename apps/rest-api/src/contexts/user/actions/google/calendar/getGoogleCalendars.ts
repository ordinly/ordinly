import { google } from "googleapis";

import { getOAuthClient } from "@services/integrations/google";

import type { UserDocument } from "@db/restAPIConnection/schemas/User";

type GetGoogleEventsProps = {
  user: UserDocument;
};

type GetGoogleEventsResponse = {
  /**
   * The main color of the calendar in the hexadecimal format "#0088aa". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional.
   */
  backgroundColor?: string | null;
  /**
   * The color of the calendar. This is an ID referring to an entry in the calendar section of the colors definition (see the colors endpoint). This property is superseded by the backgroundColor and foregroundColor properties and can be ignored when using these properties. Optional.
   */
  colorId?: string | null;
  /**
   * Description of the calendar. Optional. Read-only.
   */
  description?: string | null;
  /**
   * The foreground color of the calendar in the hexadecimal format "#ffffff". This property supersedes the index-based colorId property. To set or change this property, you need to specify colorRgbFormat=true in the parameters of the insert, update and patch methods. Optional.
   */
  foregroundColor?: string | null;
  /**
   * Identifier of the calendar.
   */
  id?: string | null;
  /**
   * Whether the calendar is the primary calendar of the authenticated user. Read-only. Optional. The default is False.
   */
  primary?: boolean | null;
  /**
   * Title of the calendar. Read-only.
   */
  summary?: string | null;
}[];

export default async ({
  user,
}: GetGoogleEventsProps): Promise<GetGoogleEventsResponse> => {
  try {
    const oauth2Client = await getOAuthClient();

    await oauth2Client.setCredentials({
      refresh_token: user.integrations.google.refreshToken,
    });

    google.options({ auth: oauth2Client });

    const calendar = google.calendar("v3");

    const {
      data: { items },
    } = await calendar.calendarList.list();

    return (
      items?.reduce((total, current) => {
        if (current) {
          const {
            backgroundColor,
            colorId,
            description,
            foregroundColor,
            id,
            primary,
            summary,
          } = current;

          return [
            ...total,
            {
              backgroundColor,
              colorId,
              description,
              foregroundColor,
              id,
              primary,
              summary,
            },
          ];
        }

        return total;
      }, [] as GetGoogleEventsResponse) || []
    );
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error fetching your Google calendars",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
