import express from "express";

import { updateCompanyPublicity } from "../../actions";

const router = express.Router({ mergeParams: true });

router.route("/").put(async (req, res) => {
  try {
    const {
      params: { companyId },
      //@ts-ignore
      user,
      body: { public: isPublic },
    } = req;

    const { status, message } = await updateCompanyPublicity({
      userId: user._id,
      companyId,
      isPublic,
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
