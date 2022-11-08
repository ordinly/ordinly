import { PUT } from "../requests";

export type ChangePasswordProps = {
  password: string;
};

export const changePassword = async (values: ChangePasswordProps) => {
  try {
    const response = await PUT({
      endpoint: `/api/user/change-password`,
      body: values,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error changing your password",
    } = caught;

    throw { status, error };
  }
};
