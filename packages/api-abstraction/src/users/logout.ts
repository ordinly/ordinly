import { POST } from "../requests";

export const logout = async () => {
  try {
    const response = await POST({
      endpoint: "/api/user/logout",
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error logging you out",
    } = caught;

    throw { status, error };
  }
};
