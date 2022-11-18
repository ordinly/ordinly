import express from "express";

import { getCities } from "../actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req: any, res) => {
  try {
    const {
      query: { country, region },
    } = req;

    const cities = getCities({
      country: country as string,
      region: region as string,
    });

    res.status(200).send({ message: "Cities fetched", cities });
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these cities",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
