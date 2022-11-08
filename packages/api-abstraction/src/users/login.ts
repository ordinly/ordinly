import { POST } from "../requests";

export type LoginArgs = {
  email: string;
  password: string;
};

export type LoginResponse = { user: any };

export const login = async (args: LoginArgs) => {
  try {
    const response = await POST<LoginResponse>({
      endpoint: "/api/user/login",
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
      error = "There was an error logging you in",
    } = caught;

    throw { status, error };
  }
};
