import { POST } from "../requests";

export type PersistentLoginResponse = { user: any };

export const persistentLogin = async () => {
  try {
    const response = await POST<PersistentLoginResponse>({
      endpoint: "/api/user/persistent-login",
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error logging you in",
    } = caught;

    throw { status, error };
  }
};
