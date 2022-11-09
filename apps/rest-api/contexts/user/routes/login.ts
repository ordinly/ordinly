import express from "express";

import { login } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").post(async (req, res) => {
  try {
    const {
      body: { password, email },
    } = req;

    const { status, user, newToken } = await login({ password, email });

    if (newToken) {
      res.cookie("auth", newToken, {
        httpOnly: true,
        signed: true,
      });
    }

    res.status(status).send({ user });
  } catch (caught: any) {
    const { status = 500, error = "We weren't able to log you in" } = caught;

    res.clearCookie("auth");

    res.status(status).send({ error });
  }
});

export { router };
