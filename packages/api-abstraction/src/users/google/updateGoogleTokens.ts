import { POST } from "../../requests";

export type UpdateGoogleTokensArgs = {
  scope: string | string[];
  code: string;
};

export const updateGoogleTokens = async (args: UpdateGoogleTokensArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/user/google-integration/update-tokens`,
      body: args,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating your Google account",
    } = caught;

    throw { status, error };
  }
};
