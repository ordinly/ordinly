import express from "express";

import { getTags } from "../actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req, res) => {
  try {
    const {} = req;

    const tags = getTags();

    res.status(200).send({ message: "Tags fetched", tags });
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these tags",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
