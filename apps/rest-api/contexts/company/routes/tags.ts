import express from "express";

import { getTags } from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req: any, res) => {
  try {
    const {} = req;

    const { status, message, tags } = await getTags();

    res.status(status).send({ message, tags });
  } catch (caught: any) {
    const { status, error } = caught;

    res.status(status).send({ error });
  }
});

export { router };
