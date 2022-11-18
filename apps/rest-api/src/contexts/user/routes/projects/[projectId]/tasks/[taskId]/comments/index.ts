import express from "express";

import { addComment } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").post(async (req: any, res) => {
  try {
    const {
      params: { projectId, taskId },
      //@ts-ignore
      user,
      body: { text },
    } = req;

    const { status, message } = await addComment({
      userId: user._id,
      projectId,
      taskId,
      text,
    });

    res.status(status).send({ message });
  } catch (caught: any) {
    const { status, error } = caught;

    res.status(status).send({ error });
  }
});

export { router };
