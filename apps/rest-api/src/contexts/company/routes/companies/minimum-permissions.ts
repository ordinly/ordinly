import express from "express";

import { getCompanyProjectMinimumPermissions } from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req: any, res) => {
  try {
    const {} = req;

    const permissions = getCompanyProjectMinimumPermissions();

    res.status(200).send({ message: "Permissions fetched", permissions });
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these permissions",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
