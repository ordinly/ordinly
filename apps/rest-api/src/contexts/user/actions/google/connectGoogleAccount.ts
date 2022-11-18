import { getOAuthClient } from "@services/integrations/google";

import type { APIResponse } from "@contexts/shared/types";
import type { UserDocument } from "@db/restAPIConnection/schemas/User";

type ConnectGoogleAccountArgs = {
  scope: string | string[];
  user: UserDocument;
  redirectURL: string;
};

export default async ({
  scope,
  user,
}: ConnectGoogleAccountArgs): APIResponse<{ url: string }> => {
  try {
    const oauth2Client = await getOAuthClient();

    const newScope = [
      ...(user.integrations?.google?.scope
        ? user.integrations?.google?.scope
        : []),
      ...(Array.isArray(scope) ? scope : [scope]),
    ];

    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: newScope,
      prompt: "consent",
    });

    return { status: 200, message: "Auth URL generated", url };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error connecting your Google account",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
