import express from "express";

import {
  revokeInvitationToCompanyProject,
  updateInvitationToCompanyProject,
} from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .put(async (req: any, res) => {
    try {
      const {
        params: { invitationId, companyId, projectId },
        body: { permissions },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await updateInvitationToCompanyProject({
        invitationId,
        permissions,
        projectId,
        companyId,
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
        params: { invitationId, projectId, companyId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await revokeInvitationToCompanyProject({
        user,
        invitationId,
        projectId,
        companyId,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
