import express from "express";

import {
  getUserProject,
  updateUserProjectDetails,
  deleteUserProject,
} from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req: any, res) => {
    try {
      const {
        params: { projectId },
        //@ts-ignore
        user,
      } = req;

      const { status, message, project } = await getUserProject({
        userId: user._id,
        projectId,
      });

      res.status(status).send({ message, project });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .put(async (req: any, res) => {
    try {
      const {
        params: { projectId },
        //@ts-ignore
        user,
        body: {
          name,
          description,
          priority,
          status: projectStatus,
          startDate,
          dueDate,
        },
        //@ts-ignore
        io,
      } = req;

      const { status, message } = await updateUserProjectDetails({
        userId: user._id,
        projectId,
        name,
        description,
        priority,
        status: projectStatus,
        startDate,
        dueDate,
      });

      io.to(projectId).emit("update-user-project");

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .delete(async (req: any, res) => {
    try {
      const {
        params: { projectId },
        //@ts-ignore
        user,
      } = req;

      console.log(projectId);

      console.log(user._id);

      const { status, message } = await deleteUserProject({
        userId: user._id,
        projectId,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
