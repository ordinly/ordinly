import express from "express";

import {
  getCompanyProjects,
  createCompanyProject,
} from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req: any, res) => {
    try {
      const {
        params: { companyId },
        query = { page: 1, pageSize: 15 },
        //@ts-ignore
        user,
      } = req;

      const { message, status, projects, total } = await getCompanyProjects({
        userId: user._id,
        companyId,
        ...query,
      });

      return res.status(status).send({ message, projects, total });
    } catch (caught: any) {
      console.log(caught);
      const {
        status = 500,
        error = "There was an error fetching your projects",
      } = caught;

      res.status(status).send({ error });
    }
  })
  .post(async (req: any, res) => {
    try {
      const {
        params: { companyId },
        body,
        //@ts-ignore
        user,
      } = req;

      const { message, status } = await createCompanyProject({
        user,
        companyId,
        ...body,
      });

      return res.status(status).send({ message });
    } catch (caught: any) {
      const {
        status = 500,
        error = "There was an error adding this project",
      } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
