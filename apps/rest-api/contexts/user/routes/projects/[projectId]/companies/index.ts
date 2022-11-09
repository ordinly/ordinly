import express from "express";

import { getUserProjectCompanies } from "@contexts/user/actions";
import { inviteCompaniesToPersonalProject } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const {
        query,
        params: { projectId },
        //@ts-ignore
        user,
      } = req;

      const { status, message, companies } = await getUserProjectCompanies({
        userId: user._id,
        projectId,
        ...query,
      });

      res.status(status).send({ message, companies });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .post(async (req, res) => {
    try {
      const {
        params: { projectId },
        //@ts-ignore
        user,
        body: { invitations },
      } = req;

      const { status, message } = await inviteCompaniesToPersonalProject({
        user,
        projectId,
        invitations,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
