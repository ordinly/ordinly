import express from "express";

import {
  updateCompanyPermissionsOnCompanyProject,
  removeCompanyFromCompanyProject,
  getCompanyProjectCompany,
} from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req: any, res) => {
    try {
      const {
        params: { projectId, invitedCompanyId, companyId },
        //@ts-ignore
        user,
      } = req;

      const { message, status, company } = await getCompanyProjectCompany({
        userId: user._id,
        projectId,
        invitedCompanyId,
        companyId,
      });

      return res.status(status).send({ message, company });
    } catch (caught: any) {
      console.log(caught);
      const {
        status = 500,
        error = "There was an error fetching these tasks",
      } = caught;

      res.status(status).send({ error });
    }
  })
  .put(async (req: any, res) => {
    try {
      const {
        params: { companyId, projectId, invitedCompanyId },
        body: { permissions },
        //@ts-ignore
        user,
      } = req;

      const {
        status,
        message,
      } = await updateCompanyPermissionsOnCompanyProject({
        companyId,
        projectId,
        permissions,
        invitedCompanyId,
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
        params: { companyId, projectId, invitedCompanyId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await removeCompanyFromCompanyProject({
        companyId,
        projectId,
        invitedCompanyId,
        user,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
