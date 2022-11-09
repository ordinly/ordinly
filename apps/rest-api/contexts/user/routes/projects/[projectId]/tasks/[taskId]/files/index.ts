import express from "express";

import { uploadSingle, parseFormDataToJSON } from "@services/documents";

import randomString from "@util/randomString";

import { addFileToTask } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").post(
  uploadSingle({
    field: "file",
    bucket: () => "projects",
    //@ts-ignore - params does exist on this object
    key: ({ params }) =>
      `/${params.projectId}/tasks/${params.taskId}/${randomString({
        length: 15,
      })}`,
  }),
  parseFormDataToJSON,
  async (req: any, res: any) => {
    try {
      const {
        file,
        user,
        params: { projectId, taskId },
      } = req;

      const { originalname, key, size, mimetype, bucket } = file;

      const { status, message } = await addFileToTask({
        projectId,
        taskId,
        userId: user._id,
        name: originalname,
        key,
        size,
        mimetype,
        bucket,
      });

      res.status(status).send({
        message,
      });
    } catch (caught: any) {
      console.log(caught);
      const { status = 500, error } = caught;

      res.status(status).send({ error });
    }
  }
);

export { router };
