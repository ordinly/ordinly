import express from "express";

import { validateEmail } from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req, res) => {
  try {
    const { query } = req;

    const { status, message } = await validateEmail({
      emailAddress: query["email-address"] as string,
      companyId: query["company-id"] as string,
      exists: (query["exists"] as string) === "true",
    });

    res.status(status).send({ message });
  } catch (caught: any) {
    const { status, error } = caught;

    res.status(status).send({ error });
  }
});

export { router };
