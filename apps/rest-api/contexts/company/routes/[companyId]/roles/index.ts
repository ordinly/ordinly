import express from "express";

import { createRole, getCompanyRoles } from "@contexts/company/actions";

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

      const { message, status, roles, total } = await getCompanyRoles({
        userId: user._id,
        companyId,
        ...query,
      });

      return res.status(status).send({ message, roles, total });
    } catch (caught: any) {
      console.log(caught);
      const {
        status = 500,
        error = "There was an error fetching your roles",
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
        body: { name, description, permissions },
      } = req;

      const { status, message } = await createRole({
        userId: user._id,
        companyId,
        name,
        description,
        permissions,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
