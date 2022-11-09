import express from "express";

import { getFileOnTask, removeFileFromTask } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const {
        params: { projectId, taskId, fileId },
        //@ts-ignore
        user,
      } = req;

      const { file } = await getFileOnTask({
        taskId,
        userId: user._id,
        projectId,
        fileId,
      });

      res.writeHead(200, { "Content-Type": "image/*" });
      res.end(file);
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .delete(async (req, res) => {
    try {
      const {
        params: { projectId, taskId, fileId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await removeFileFromTask({
        taskId,
        userId: user._id,
        projectId,
        fileId,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
