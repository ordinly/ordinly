import express from "express";

import { uploadMany, parseFormDataToJSON } from "@services/documents";

import randomString from "@util/randomString";

import { updateContact, removeContact } from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .put(
    uploadMany({
      field: "newFiles",
      bucket: () => "companies",
      //@ts-ignore - params does exist on this object
      key: ({ params }) => {
        return `/${params.companyId}/clients/${params.clientId}/contact/${
          params.contactId
        }/${randomString({
          length: 15,
        })}`;
      },
    }),
    parseFormDataToJSON,
    async (req: any, res) => {
      try {
        const {
          params: { companyId, clientId, contactId },
          //@ts-ignore
          user,
          body: { name, email, phoneNumber, description, existingFiles, notes },
          files,
        } = req;

        const { status, message } = await updateContact({
          userId: user._id,
          clientId,
          contactId,
          companyId,
          name,
          email,
          phoneNumber,
          description,
          files: files as any[],
          existingFiles,
          notes,
        });

        res.status(status).send({ message });
      } catch (caught: any) {
        const { status, error } = caught;

        res.status(status).send({ error });
      }
    }
  )
  .delete(async (req: any, res) => {
    try {
      const {
        params: { companyId, clientId, contactId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await removeContact({
        userId: user._id,
        companyId,
        clientId,
        contactId,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
