import express from "express";

import { changePassword } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").put(async (req: any, res) => {
  try {
    const {
      body: { password },
      //@ts-ignore
      user,
    } = req;

    const { status, message } = await changePassword({
      userId: user._id,
      password,
    });

    res.status(status).send({ message });
  } catch (caught: any) {
    const { status, error } = caught;

    res.status(status).send({ error });
  }
});

export { router };
