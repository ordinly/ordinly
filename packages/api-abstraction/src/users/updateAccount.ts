import { UPLOAD } from "../requests";

export type UpdateAccountArgs = {
  email: string;
  name: string;
};

export const updateAccount = async (args: UpdateAccountArgs) => {
  try {
    const response = await UPLOAD({
      action: "PUT",
      endpoint: "/api/user",
      body: args,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const { status = 500, error = "There was an error updating your account" } =
      caught || {};

    throw { status, error };
  }
};
