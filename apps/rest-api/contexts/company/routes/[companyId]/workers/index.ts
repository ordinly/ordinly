import express from "express";

import {
  inviteWorkers,
  leaveCompany,
  getCompanyWorkers,
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

      const { message, status, workers, total } = await getCompanyWorkers({
        userId: user._id,
        companyId,
        ...query,
      });

      return res.status(status).send({ message, workers, total });
    } catch (caught: any) {
      console.log(caught);
      const {
        status = 500,
        error = "There was an error fetching your workers",
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
        body: { invitations },
      } = req;

      const { status, message } = await inviteWorkers({
        userId: user._id,
        companyId,
        invitations,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .delete(async (req: any, res) => {
    try {
      const {
        params: { companyId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await leaveCompany({
        userId: user._id,
        companyId,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
