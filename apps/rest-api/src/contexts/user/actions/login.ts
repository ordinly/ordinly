import bcrypt from "bcryptjs";

import auth from "@services/auth";

import { getUserByEmail } from "@contexts/user/actions";

type LoginProps = {
  email: string;
  password: string;
};

export default async ({ email, password }: LoginProps) => {
  try {
    if (!email) {
      throw { status: 400, error: "An email address is required" };
    }

    if (!password) {
      throw { status: 400, error: "A password is required" };
    }

    const userReturn = await getUserByEmail({ email });

    if (!userReturn) {
      throw {
        status: 401,
        error: "That email/password combination didn't match our records",
      };
    }

    const { user, invitations } = userReturn;

    if (!user) {
      throw {
        status: 401,
        error: "That email/password combination didn't match our records",
      };
    }

    const {
      _id,
      password: dbPassword,
      name,
      email: userEmail,
      phone,
      profile,
    } = user;

    if (!bcrypt.compareSync(password, dbPassword)) {
      throw {
        status: 401,
        error: "That email/password combination didn't match our records",
      };
    }

    const newToken = auth.sign({ _id });

    return {
      status: 200,
      user: {
        _id,
        name,
        email: userEmail,
        phone,
        profile,
        invitations,
      },
      newToken,
    };
  } catch (caught: any) {
    console.log(caught);
    const { status = 500, error = "We weren't able to log you in" } = caught;

    throw { status: status, error: error };
  }
};
