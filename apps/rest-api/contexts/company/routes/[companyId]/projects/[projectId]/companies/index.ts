import express from "express";

import {
  getCompanyProjectCompanies,
  inviteCompanyToCompanyProject,
} from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const {
        params: { projectId, companyId },
        query = { page: 1, pageSize: 15 },
        //@ts-ignore
        user,
      } = req;

      const {
        message,
        status,
        companies,
        total,
      } = await getCompanyProjectCompanies({
        userId: user._id,
        projectId,
        companyId,
        ...query,
      });

      return res.status(status).send({ message, companies, total });
    } catch (caught: any) {
      const {
        status = 500,
        error = "There was an error fetching these companies",
      } = caught;

      res.status(status).send({ error });
    }
  })
  .post(async (req, res) => {
    try {
      const {
        params: { projectId, companyId },
        //@ts-ignore
        user,
        body: { invitations = [] },
      } = req;

      const { status, message } = await inviteCompanyToCompanyProject({
        user,
        projectId,
        companyId,
        invitations,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
