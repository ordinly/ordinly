import { getOAuthClient } from "@services/integrations/google";

import type { APIResponse } from "@contexts/shared/types";
import type { UserDocument } from "@db/restAPIConnection/schemas/User";

type UpdateGoogleTokensArgs = {
  scope: string | string[];
  user: UserDocument;
  code: string;
};

export default async ({
  code,
  scope,
  user,
}: UpdateGoogleTokensArgs): APIResponse => {
  try {
    const oauth2Client = await getOAuthClient();

    const newScope = [
      ...(user.integrations?.google?.scope
        ? user.integrations?.google?.scope
        : []),
      ...(Array.isArray(scope) ? scope : [scope]),
    ].reduce((total, current) => {
      if (!total.includes(current)) {
        return [...total, current];
      } else {
        return total;
      }
    }, [] as string[]);

    user.integrations.google.scope = newScope;
    user.integrations.google.code = code;

    const {
      tokens: { access_token, refresh_token },
    } = await oauth2Client.getToken(code);

    user.integrations.google.accessToken = access_token as string;
    user.integrations.google.refreshToken = refresh_token as string;

    await user.save();

    return { status: 200, message: "Google account updated" };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error updating your Google account",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
