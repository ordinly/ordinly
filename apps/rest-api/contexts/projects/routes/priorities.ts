import express from "express";

import { getPriorities } from "@contexts/projects/actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req, res) => {
  try {
    const {} = req;

    const priorities = getPriorities();

    res.status(200).send({ message: "Priorities fetched", priorities });
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these priorities",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
