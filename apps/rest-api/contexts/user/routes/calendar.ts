import express from "express";

import { getUserCalendar } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").post(async (req, res) => {
  try {
    const {
      body: { companies },
      //@ts-ignore
      user,
    } = req;

    await getUserCalendar({
      id: user.id,
      companies,
    });
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching your calendar events",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
