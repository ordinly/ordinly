import type { UserDocument } from "@db/restAPIConnection/schemas/User";

type UpdateGoogleCalendarConfigProps = {
  user: UserDocument;
  syncedCalendars: string[];
};

export default async ({
  user,
  syncedCalendars,
}: UpdateGoogleCalendarConfigProps): Promise<void> => {
  try {
    user.integrations.google.calendar.syncedCalendars = syncedCalendars;

    await user.save();
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error updating your calendar configuration",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
