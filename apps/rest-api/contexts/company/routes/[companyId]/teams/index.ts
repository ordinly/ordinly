import express from "express";

import { createTeam, getCompanyTeams } from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const {
        params: { companyId },
        query = { page: 1, pageSize: 15 },
        //@ts-ignore
        user,
      } = req;

      const { message, status, teams, total } = await getCompanyTeams({
        userId: user._id,
        companyId,
        ...query,
      });

      return res.status(status).send({ message, teams, total });
    } catch (caught: any) {
      console.log(caught);
      const {
        status = 500,
        error = "There was an error fetching your workers",
      } = caught;

      res.status(status).send({ error });
    }
  })
  .post(async (req, res) => {
    try {
      const {
        params: { companyId },
        //@ts-ignore
        user,
        body: { name, description, members },
      } = req;

      const { status, message } = await createTeam({
        companyId,
        name,
        description,
        members,
        userId: user._id,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
