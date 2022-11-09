import express from "express";

import { updateAccount } from "@contexts/user/actions";

import { uploadSingle, parseFormDataToJSON } from "@services/documents";

const router = express.Router({ mergeParams: true });

router.route("/").put(
  uploadSingle({
    field: "profilePicture",
    bucket: () => "profile-pictures",
    //@ts-ignore - params does exist on this object
    key: (req) => {
      const {
        //@ts-ignore
        user,
      } = req;

      return `/users/${user._id}`;
    },
  }),
  parseFormDataToJSON,
  async (req, res) => {
    try {
      const {
        body: { name },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await updateAccount({
        userId: user._id,
        name,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  }
);

export { router };
