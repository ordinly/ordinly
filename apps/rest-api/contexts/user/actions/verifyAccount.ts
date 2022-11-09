import { getUserByVerificationCode } from "@contexts/user/actions";

import send from "@services/email";

import type { APIResponse } from "@contexts/shared/types";

type VerifyAccountProps = {
  code: string;
};

const successMessage = "Account successfully verified!";

export default async ({ code }: VerifyAccountProps): APIResponse => {
  try {
    const userResponse = await getUserByVerificationCode({
      verificationCode: code,
    });

    if (userResponse) {
      const { user } = userResponse;

      if (user.verified) {
        throw {
          status: 409,
          error: "This account has already been verified",
        };
      } else {
        user.verified = true;

        user.save();

        await send({
          email: user.email,
          type: "accountVerified",
        });

        return { status: 200, message: successMessage };
      }
    }

    throw {};
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error verifying your account",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
