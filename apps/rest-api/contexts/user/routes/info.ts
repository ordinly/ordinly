import express from "express";

import { getUserById } from "@contexts/user/actions";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req, res) => {
  try {
    const {
      //@ts-ignore
      user,
    } = req;

    const userReturn = await getUserById({ id: user.id });

    if (userReturn) {
      const {
        user: { _id, name, email, phone, profile },
        invitations,
      } = userReturn;

      return res.status(200).send({
        message: "User fetched",
        user: {
          _id,
          name,
          email,
          phone,
          profile,
          invitations,
        },
      });
    }

    throw {};
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching this account",
    } = caught;

    res.status(status).send({ error });
  }
});

export { router };
