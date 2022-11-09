import express from "express";

import { getUserProjects, createUserProject } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const {
        query = { page: 1, pageSize: 15 },
        //@ts-ignore
        user,
      } = req;

      const { message, status, projects, total } = await getUserProjects({
        userId: user._id,
        ...query,
      });

      return res.status(status).send({ message, projects, total });
    } catch (caught: any) {
      const {
        status = 500,
        error = "There was an error fetching your projects",
      } = caught;

      res.status(status).send({ error });
    }
  })
  .post(async (req, res) => {
    try {
      const {
        //@ts-ignore
        user,
        body: {
          name,
          description,
          startDate,
          dueDate,
          priority,
          status: projectStatus,
          invitations,
        },
      } = req;

      const { status, message } = await createUserProject({
        user,
        name,
        description,
        startDate,
        dueDate,
        priority,
        status: projectStatus,
        invitations,
      });

      return res.status(status).send({ message });
    } catch (caught: any) {
      const {
        status = 500,
        error = "There was an error adding this projects",
      } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
