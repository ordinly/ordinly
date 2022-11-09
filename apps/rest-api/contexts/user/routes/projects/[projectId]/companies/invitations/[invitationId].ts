import express from "express";

import {
  revokeInvitationToPersonalProject,
  updateInvitationToPersonalProject,
} from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .put(async (req: any, res) => {
    try {
      const {
        params: { invitationId },
        body: { permissions },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await updateInvitationToPersonalProject({
        invitationId,
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
        params: { invitationId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await revokeInvitationToPersonalProject({
        user,
        invitationId,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
