import express from "express";

import {
  getClient,
  deleteClient,
  updateClientDetails,
} from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const {
        params: { companyId, clientId },
        //@ts-ignore
        user,
      } = req;

      const { status, message, client } = await getClient({
        userId: user._id,
        clientId,
        companyId,
      });

      res.status(status).send({ message, client });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .put(async (req, res) => {
    try {
      const {
        params: { companyId, clientId },
        body: { name, description },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await updateClientDetails({
        companyId,
        clientId,
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
        params: { companyId, clientId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await deleteClient({
        clientId,
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
