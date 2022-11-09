import express from "express";

import mongoose from "mongoose";

import { createCompany, getCompanies } from "@contexts/company/actions";

import { uploadSingle, parseFormDataToJSON } from "@services/documents";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const {
        //@ts-ignore
        user,
      } = req;

      const { status, message, companies } = await getCompanies({
        userId: user._id,
      });

      res.status(status).send({ message, companies });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .post(
    uploadSingle({
      field: "profilePicture",
      bucket: () => "companies",
      //@ts-ignore - params does exist on this object
      key: () => {
        const companyId = mongoose.Types.ObjectId().toString();

        return `/${companyId}/profile-picture`;
      },
    }),
    parseFormDataToJSON,
    async (req, res) => {
      try {
        const {
          //@ts-ignore
          user,
          body: { name },
          file,
        } = req;

        const fileParams = file
          ? {
              //@ts-ignore
              companyId: file.key.split("/")[1],
              //@ts-ignore
              profilePicture: { key: file.key, name: file.originalname },
            }
          : {};

        const { status, message, companyId } = await createCompany({
          ...fileParams,
          name,
          userId: user._id,
        });

        res.status(status).send({ message, companyId });
      } catch (caught: any) {
        console.log(caught);
        const { status = 500, error } = caught;

        res.status(status).send({ error });
      }
    }
  );

export { router };
