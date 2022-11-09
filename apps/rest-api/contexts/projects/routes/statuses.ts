import express from "express";

import { getStatuses } from "@contexts/projects/actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req: any, res) => {
  try {
    const {} = req;

    const statuses = getStatuses();

    res.status(200).send({ message: "Statuses fetched", statuses });
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these statuses",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
