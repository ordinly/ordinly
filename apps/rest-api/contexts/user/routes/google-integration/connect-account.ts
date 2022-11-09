import express from "express";

import { connectGoogleAccount } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").post(async (req, res) => {
  try {
    const {
      //@ts-ignore
      user,
      body: { scope },
    } = req;

    const { status, message, url } = await connectGoogleAccount({
      user,
      scope,
      redirectURL: (req.headers.referer as string).replace(
        req.headers.origin as string,
        ""
      ),
    });

    res.status(status).send({
      message,
      url: url,
    });
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error connecting your Google account",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
