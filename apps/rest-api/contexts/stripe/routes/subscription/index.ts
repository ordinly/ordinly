import express from "express";

import { config } from "dotenv";

import { createSubscription } from "@contexts/stripe/actions";

config();

const router = express.Router({ mergeParams: true });

//@ts-ignore - Req is not used, and doesn't need to be
router.route("/").post(async (req, res) => {
  try {
    const {
      body: { companyId },
    } = req;

    const url = req.headers.referer?.split("?")[0] as string;

    const { status, message, sessionId } = await createSubscription({
      url,
      companyId,
    });

    res.status(status).send({ message, sessionId });
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
