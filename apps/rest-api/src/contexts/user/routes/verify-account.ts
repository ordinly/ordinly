import express from "express";

import { verifyAccount } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req: any, res) => {
  try {
    const {
      query: { code },
    } = req;

    const { status, message } = await verifyAccount({
      code: code as string,
    });

    res.status(status).send({ message });
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error verifying your account",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
