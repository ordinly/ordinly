import express from "express";

import { updateCompanyOwner } from "../../actions";

const router = express.Router({ mergeParams: true });

router.route("/").put(async (req, res) => {
  try {
    const {
      params: { companyId },
      body: { user, newOwner, newRole, onChangeOwner },
    } = req;

    const { status, message } = await updateCompanyOwner({
      userId: user._id,
      companyId,
      newOwner,
      newRole,
      onChangeOwner,
    });

    res.status(status).send({ message });
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error updating this company",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
