import express from "express";

import { getRegions } from "../actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req: any, res) => {
  try {
    const {
      query: { country },
    } = req;

    const regions = getRegions({ country: country as string });

    res.status(200).send({ message: "Regions fetched", regions });
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these regions",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
