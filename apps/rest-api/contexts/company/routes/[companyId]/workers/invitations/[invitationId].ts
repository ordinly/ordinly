import express from "express";

import { updateInvitation, revokeInvitation } from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .put(async (req: any, res) => {
    try {
      const {
        params: { invitationId },
        //@ts-ignore
        user,
        body: { roleId },
      } = req;

      const { status, message } = await updateInvitation({
        userId: user._id,
        invitationId,
        roleId,
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

      const { status, message } = await revokeInvitation({
        userId: user._id,
        invitationId,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
