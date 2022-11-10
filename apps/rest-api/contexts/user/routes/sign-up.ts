import express from "express";

import { signUp } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").post(async (req: any, res) => {
  try {
    const {
      body: { email, password, name },
    } = req;

    console.log(email, password, name);

    const { status, message } = await signUp({
      email,
      name,
      password,
      referer: req.headers.referer?.split("?")[0] as string,
    });

    res.status(status).send({ message });
  } catch (caught: any) {
    const { status, error } = caught;

    res.status(status).send({ error });
  }
});

export { router };
