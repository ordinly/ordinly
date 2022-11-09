import { User } from "@db/restAPIConnection/schemas/User";

import type { APIResponse } from "@contexts/shared/types";

type UpdateAccountProps = {
  userId: string;
  name: string;
};

export default async ({ userId, name }: UpdateAccountProps): APIResponse => {
  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw { status: 404, error: "User not found" };
    }

    user.name = name;

    await user.save();

    return { status: 200, message: "Account details updated" };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error updating this account",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
