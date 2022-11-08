import { GET } from "../requests";

export type VerifyAccountArgs = {
  code: string;
};

export const verifyAccount = async ({ code }: VerifyAccountArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/user/verify-account${code}`,
    });

    return response;
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error verifying this account",
    } = caught;

    return { status, error };
  }
};
