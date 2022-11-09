import express from "express";

import { uploadSingle, parseFormDataToJSON } from "@services/documents";

import { getCompany, updateCompany, deleteCompany } from "../../actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req: any, res) => {
    try {
      const {
        params: { companyId },
        //@ts-ignore
        user,
      } = req;

      const { status, message, company } = await getCompany({
        userId: user._id,
        companyId,
      });

      res.status(status).send({ message, company });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .put(
    uploadSingle({
      field: "profilePicture",
      bucket: () => "companies",
      //@ts-ignore - params does exist on this object
      key: ({ params }) => `/${params.companyId}/profile-picture`,
    }),
    parseFormDataToJSON,
    async (req: any, res: any) => {
      try {
        const {
          params: { companyId },
          //@ts-ignore
          user,
          body: { name, description, emailAddress, phoneNumber },
          file,
        } = req;

        const { status, message } = await updateCompany({
          userId: user._id,
          companyId,
          name,
          description,
          emailAddress,
          phoneNumber,
          profilePicture: file
            ? { key: file.key, name: file.originalname }
            : {},
        });

        res.status(status).send({ message });
      } catch (caught: any) {
        console.log(caught);
        const { status = 500, error } = caught;

        res.status(status).send({ error });
      }
    }
  )
  .delete(async (req: any, res) => {
    try {
      const {
        params: { companyId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await deleteCompany({
        userId: user._id,
        companyId,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      console.error(caught);
      const { status = 500, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
