import express from "express";

import {
  getCompanyProfile,
  updateCompanyProfile,
} from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .put(async (req, res) => {
    try {
      const {
        params: { companyId },
        body: { tagline, description, tags },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await updateCompanyProfile({
        companyId,
        userId: user._id,
        tagline,
        description,
        tags,
      });

      return res.status(status).send({ message });
    } catch (caught: any) {
      console.error(caught);

      res.end(null);
    }
  })
  .get(async (req, res) => {
    try {
      const {
        params: { companyId },
        //@ts-ignore
        user,
      } = req;

      const { status, message, profile } = await getCompanyProfile({
        companyId,
        userId: user._id,
      });

      return res.status(status).send({ message, profile });
    } catch (caught: any) {
      console.error(caught);

      res.end(null);
    }
  });

export { router };
