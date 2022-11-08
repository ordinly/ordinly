import { POST } from "../requests";

export type SignUpArgs = {
  email: string;
  name: string;
  password: string;
};

export const signUp = async (args: SignUpArgs) => {
  try {
    const response = await POST({ endpoint: "/api/user/sign-up", body: args });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error signing you up",
    } = caught;

    return { status, error };
  }
};
