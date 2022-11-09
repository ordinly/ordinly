import express from "express";

import { respondToInvitation } from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router.route("/").post(async (req, res) => {
  try {
    const {
      params: { companyId, invitationId },
      body: { accepted, clientId },
      //@ts-ignore
      user,
    } = req;

    const { status, message } = await respondToInvitation({
      companyId,
      invitationId,
      accepted,
      userId: user._id,
      clientId,
    });

    res.status(status).send({ message });
  } catch (caught: any) {
    const { status, error } = caught;

    res.status(status).send({ error });
  }
});

export { router };
