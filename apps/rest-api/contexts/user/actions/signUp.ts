import bcrypt from "bcryptjs";

import { User } from "@db/restAPIConnection/schemas/User";

import { getUserByEmail } from "@contexts/user/actions";

import send from "@services/email";

import randomString from "@util/randomString";

import type { APIResponse } from "@contexts/shared/types";

type SignUpProps = {
  email: string;
  password: string;
  name: string;
  referer: string;
};

const successMessage = "Verification email sent!";

export default async ({
  email,
  password,
  referer,
  ...rest
}: SignUpProps): APIResponse => {
  try {
    const userResponse = await getUserByEmail({ email: email.toLowerCase() });

    if (userResponse) {
      const { user } = userResponse;

      if (user.verified) {
        await send({ email, type: "attemptedSignUp" });
      } else {
        await send({
          email,
          type: "attemptedSignUpWithUnverified",
          verificationCode: user.verificationCode,
        });
      }

      return { status: 200, message: successMessage };
    } else {
      const hashedPassword = await bcrypt.hashSync(password, 8);

      const verificationCode = randomString({ length: 25 });

      const newUser = await User.create({
        email: email.toLowerCase(),
        password: hashedPassword,
        verified: false,
        verificationCode,
        accountType: "basic",
        private: true,
        ...rest,
      });

      if (newUser) {
        await send({
          email,
          type: "successfulSignUp",
          verificationCode,
          referer,
        });

        return { status: 200, message: successMessage };
      }
    }

    throw {};
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error sending your verification email",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
