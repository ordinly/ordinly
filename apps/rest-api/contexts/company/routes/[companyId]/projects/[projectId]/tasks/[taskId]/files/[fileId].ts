import express from "express";

import { getFileOnTask } from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req, res) => {
  try {
    const {
      params: { projectId, taskId, fileId, companyId },
      //@ts-ignore
      user,
    } = req;

    const { file } = await getFileOnTask({
      taskId,
      userId: user._id,
      projectId,
      fileId,
      companyId,
    });

    res.writeHead(200, { "Content-Type": "image/*" });
    res.end(file);
  } catch (caught: any) {
    const { status, error } = caught;

    res.status(status).send({ error });
  }
});

export { router };
