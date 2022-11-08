import { GET } from "../requests";

type UserInfoResponse = { user: any };

export const getUser = async () => {
  try {
    const response = await GET<UserInfoResponse>({
      endpoint: `/api/user/info`,
    });

    return response;
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching this account",
    } = caught;

    return { status, error };
  }
};
