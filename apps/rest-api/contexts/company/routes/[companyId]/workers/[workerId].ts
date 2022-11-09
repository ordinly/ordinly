import express from "express";

import {
  updateWorker,
  removeWorker,
  getCompanyWorker,
} from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const {
        params: { companyId, workerId },
        //@ts-ignore
        user,
      } = req;

      const { status, message, worker } = await getCompanyWorker({
        workerId,
        companyId,
        userId: user._id,
      });

      res.status(status).send({ message, worker });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .put(async (req, res) => {
    try {
      const {
        params: { companyId, workerId },
        //@ts-ignore
        user,
        body: { role, status: newStatus },
      } = req;

      const { status, message } = await updateWorker({
        workerId,
        companyId,
        status: newStatus,
        roleId: role,
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
        params: { companyId, workerId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await removeWorker({
        workerId,
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
