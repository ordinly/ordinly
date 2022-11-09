import express from "express";

import { getCountries } from "../actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req, res) => {
  try {
    const {} = req;

    const countries = getCountries();

    res.status(200).send({ message: "Countries fetched", countries });
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these countries",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
