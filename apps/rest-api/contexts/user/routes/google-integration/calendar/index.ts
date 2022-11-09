import express from "express";

import {
  getGoogleCalendars,
  updateGoogleCalendarConfig,
} from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req: any, res) => {
    try {
      const {
        //@ts-ignore
        user,
      } = req;

      const calendars = await getGoogleCalendars({ user });

      return res.status(200).send({ message: "Calendars fetched", calendars });
    } catch (caught: any) {
      const {
        status = 500,
        error = "There was an error fetching your Google calendars",
      } = caught;

      res.status(status).send({ error });
    }
  })
  .put(async (req: any, res) => {
    try {
      const {
        //@ts-ignore
        user,
        body: { syncedCalendars },
      } = req;

      await updateGoogleCalendarConfig({ user, syncedCalendars });

      return res.status(200).send({ message: "Calendars updated" });
    } catch (caught: any) {
      const {
        status = 500,
        error = "There was an error fetching your Google calendars",
      } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
