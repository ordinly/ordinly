import express from "express";

import { declineInvitation } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").post(async (req: any, res) => {
  try {
    const {
      params: { invitationId },
      //@ts-ignore
      user,
    } = req;

    const { status, message } = await declineInvitation({
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
