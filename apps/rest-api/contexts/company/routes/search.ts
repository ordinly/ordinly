import express from "express";

import { searchCompanies } from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req, res) => {
  try {
    const {
      query = { page: 1, pageSize: 15, searchTerm: "", ids: "", exclude: "" },
    } = req;

    const { status, message, companies, total } = await searchCompanies(query);

    res.status(status).send({ message, companies, total });
  } catch (caught: any) {
    const { status, error } = caught;

    res.status(status).send({ error });
  }
});

export { router };
