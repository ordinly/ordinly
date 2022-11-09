import express from "express";

import { updateGoogleTokens } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").post(async (req, res) => {
  try {
    const {
      //@ts-ignore
      user,
      body: { scope, code },
    } = req;

    const { status, message } = await updateGoogleTokens({
      user,
      scope,
      code,
    });

    res.status(status).send({
      message,
    });
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error updating your Google account",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
