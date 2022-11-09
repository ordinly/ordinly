import express from "express";

import {
  updateCompanyReview,
  deleteCompanyReview,
  getCompanyReview,
} from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .put(async (req, res) => {
    try {
      const {
        //@ts-ignore
        user: { _id },
        params: { companyId, reviewId },
        body: { rating, details, title },
      } = req;

      const { status, message } = await updateCompanyReview({
        companyId,
        reviewId,
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
  })
  .get(async (req, res) => {
    try {
      const {
        //@ts-ignore
        user: { _id },
        params: { companyId, reviewId },
      } = req;

      const { status, message, review } = await getCompanyReview({
        companyId,
        reviewId,
        userId: _id,
      });

      return res.status(status).send({ message, review });
    } catch (caught: any) {
      console.error(caught);

      res.end(null);
    }
  })
  .delete(async (req, res) => {
    try {
      const {
        //@ts-ignore
        user: { _id },
        params: { companyId, reviewId },
      } = req;

      const { status, message } = await deleteCompanyReview({
        companyId,
        reviewId,
        userId: _id,
      });

      return res.status(status).send({ message });
    } catch (caught: any) {
      console.error(caught);

      res.end(null);
    }
  });

export { router };
