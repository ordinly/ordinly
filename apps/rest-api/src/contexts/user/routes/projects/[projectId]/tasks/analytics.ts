import express from "express";

import { getTaskAnalytics } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req: any, res) => {
  try {
    const {
      params: { projectId },
      query = { page: 1, pageSize: 15 },
      //@ts-ignore
      user,
    } = req;

    const { message, status, tasks } = await getTaskAnalytics({
      userId: user._id,
      projectId,
      ...query,
    });

    return res.status(status).send({ message, tasks });
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching your task analytics",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
