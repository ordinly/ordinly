import express from "express";

import { searchUsers } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req: any, res) => {
  try {
    const {
      query = { page: 1, pageSize: 15, searchTerm: "", ids: "", exclude: "" },
    } = req;

    const { status, message, users, total } = await searchUsers(query);

    res.status(status).send({ message, users, total });
  } catch (caught: any) {
    const { status, error } = caught;

    res.status(status).send({ error });
  }
});

export { router };
