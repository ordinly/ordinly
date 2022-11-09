import express from "express";

import { persistentLogin } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").post(async (req: any, res) => {
  try {
    const {
      signedCookies: { auth: token },
    } = req;

    const { status, user, newToken } = await persistentLogin({ token });

    if (newToken) {
      res.cookie("auth", newToken, {
        httpOnly: true,
        signed: true,
        sameSite: "strict",
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
