import express from "express";

import {
  getSingle,
  uploadSingle,
  parseFormDataToJSON,
} from "@services/documents";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const {
        params: { companyId },
      } = req;

      const response = await getSingle({
        bucket: "companies",
        key: `/${companyId}/profile-picture`,
      });

      res.writeHead(200, { "Content-Type": "image/*" });
      res.end(response?.Body);
    } catch (caught: any) {
      console.error(caught);

      res.end(null);
    }
  })
  .post(
    uploadSingle({
      field: "profilePicture",
      bucket: () => "companies",
      //@ts-ignore - params does exist on this object
      key: ({ params }) => `/${params.companyId}/profile-picture`,
    }),
    parseFormDataToJSON,
    async (req: any, res: any) => {
      try {
        const { file } = req;

        let message = file ? "File uploaded" : "Error uploading file";

        res
          .status(file ? 200 : 500)
          .send({ message, key: file?.key, name: file?.originalname });
      } catch (caught: any) {
        console.log(caught);
        const { status = 500, error } = caught;

        res.status(status).send({ error });
      }
    }
  );

export { router };
