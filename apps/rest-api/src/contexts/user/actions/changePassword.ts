import bcrypt from "bcryptjs";

import { User } from "@db/restAPIConnection/schemas/User";

import send from "@services/email";

import type { APIResponse } from "@contexts/shared/types";

type UpdateAccountProps = {
  userId: string;
  password: string;
};

export default async ({
  userId,
  password,
}: UpdateAccountProps): APIResponse => {
  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw { status: 404, error: "User not found" };
    }

    await send({ email: user.email, type: "changedPassword" });

    const hashedPassword = await bcrypt.hashSync(password, 8);

    user.password = hashedPassword;

    await user.save();

    return { status: 200, message: "Account password updated" };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error updating this account's password",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
