import express from "express";

import {
  updateCompanyPermissionsOnPersonalProject,
  removeCompanyFromPersonalProject,
} from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .put(async (req: any, res) => {
    try {
      const {
        params: { companyId, projectId },
        body: { permissions },
        //@ts-ignore
        user,
      } = req;

      const {
        status,
        message,
      } = await updateCompanyPermissionsOnPersonalProject({
        companyId,
        projectId,
        permissions,
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
        params: { companyId, projectId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await removeCompanyFromPersonalProject({
        companyId,
        projectId,
        user,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
