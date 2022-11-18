import auth from "@services/auth";

import { getUserById } from "@contexts/user/actions";

type LoginProps = {
  token: string;
};

export default async ({ token }: LoginProps) => {
  try {
    const verifiedToken = auth.verify(token) as { _id: string };

    if (!verifiedToken) {
      throw {
        status: 401,
        error: "Invalid token",
      };
    }

    const userReturn = await getUserById({ id: verifiedToken._id });

    if (!userReturn) {
      throw {
        status: 401,
        error: "Invalid token",
      };
    }

    const { user, invitations } = userReturn;

    if (!user) {
      throw {
        status: 401,
        error: "Invalid token",
      };
    }

    const { _id, name, email, phone, profile } = user;

    const newToken = auth.sign({ _id });

    return {
      status: 200,
      user: {
        _id,
        name,
        email,
        phone,
        profile,
        invitations,
      },
      newToken,
    };
  } catch (caught: any) {
    const { status = 500, error = "We weren't able to log you in" } = caught;

    throw { status: status, error: error };
  }
};
