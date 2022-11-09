import express from "express";

import { reviewCompany } from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router.route("/").post(async (req, res) => {
  try {
    const {
      //@ts-ignore
      user: { _id },
      params: { companyId },
      body: { rating, details, title },
    } = req;

    const { status, message } = await reviewCompany({
      companyId,
      userId: _id,
      details,
      rating,
      title,
    });

    return res.status(status).send({ message });
  } catch (caught: any) {
    console.error(caught);

    res.end(null);
  }
});

export { router };
