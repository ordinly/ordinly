import express from "express";

import { getSingle } from "@services/documents";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req: any, res) => {
  try {
    const {
      params: { userId },
    } = req;

    const response = await getSingle({
      bucket: "profile-pictures",
      key: `/users/${userId}`,
    });

    res.writeHead(200, { "Content-Type": "image/*" });
    res.end(response?.Body);
  } catch (caught: any) {
    console.error(caught);
    const { status = 500, error } = caught;

    res.status(status).send({ error });
  }
});
export { router };
