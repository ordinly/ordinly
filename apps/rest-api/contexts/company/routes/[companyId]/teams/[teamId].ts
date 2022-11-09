import express from "express";

import {
  updateTeam,
  removeTeam,
  getCompanyTeam,
} from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const {
        params: { companyId, teamId },
        //@ts-ignore
        user,
      } = req;

      const { status, message, team } = await getCompanyTeam({
        teamId,
        companyId,
        userId: user._id,
      });

      res.status(status).send({ message, team });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .put(async (req, res) => {
    try {
      const {
        params: { companyId, teamId },
        //@ts-ignore
        user,
        body: { name, description, members },
      } = req;

      const { status, message } = await updateTeam({
        teamId,
        companyId,
        members,
        name,
        description,
        userId: user._id,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .delete(async (req, res) => {
    try {
      const {
        params: { companyId, teamId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await removeTeam({
        teamId,
        companyId,
        userId: user._id,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
