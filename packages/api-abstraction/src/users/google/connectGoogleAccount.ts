import { POST } from "../../requests";

export type ConnectGoogleAccountArgs = {
  scope: string | string[];
};

export const connectGoogleAccount = async (args: ConnectGoogleAccountArgs) => {
  try {
    const response = await POST<{ url: string }>({
      endpoint: `/api/user/google-integration/connect-account`,
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
      error = "There was an error connecting to Google",
    } = caught;

    throw { status, error };
  }
};
