import express from "express";

import { addCompanyClient, getCompanyClients } from "@contexts/company/actions";

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

      const { status, message, clients, total } = await getCompanyClients({
        companyId,
        ...query,
      });

      return res.status(status).send({ message, clients, total });
    } catch (caught: any) {
      const {
        status = 500,
        error = "There was an error fetching your clients",
      } = caught;

      res.status(status).send({ error });
    }
  })
  .post(async (req: any, res) => {
    try {
      const {
        params: { companyId },
        //@ts-ignore
        user,
        body: { company, name, description, contacts, address },
      } = req;

      const { status, message } = await addCompanyClient({
        userId: user._id,
        companyId,
        companyClient: company,
        name,
        description,
        contacts,
        address,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
