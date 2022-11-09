import express from "express";

import { config } from "dotenv";

import { updateSubscription } from "@contexts/stripe/actions";

config();

const router = express.Router({ mergeParams: true });

//@ts-ignore - Req is not used, and doesn't need to be
router.route("/").put(async (req, res) => {
  try {
    const {
      params: { companyId },
    } = req;

    const url = req.headers.referer as string;

    const { status, message, sessionURL } = await updateSubscription({
      url,
      companyId,
    });

    res.status(status).send({ message, sessionURL });
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "We weren't able to complete this request",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
