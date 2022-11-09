import express from "express";

import mongoose from "mongoose";

import {
  addContact,
  getCompanyClientContacts,
} from "@contexts/company/actions";

import { uploadMany, parseFormDataToJSON } from "@services/documents";

import randomString from "@util/randomString";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const {
        params: { companyId, clientId },
        //@ts-ignore
        user,
        query = { page: 1, pageSize: 15 },
      } = req;

      const {
        status,
        message,
        contacts,
        total,
      } = await getCompanyClientContacts({
        companyId,
        clientId,
        ...query,
      });

      res.status(status).send({ message, contacts, total });
    } catch (caught: any) {
      const {
        status = 500,
        error = "There was an error fetching your contacts",
      } = caught;

      res.status(status).send({ error });
    }
  })
  .post(
    uploadMany({
      field: "files",
      bucket: () => "companies",
      //@ts-ignore - params does exist on this object
      key: ({ params }) => {
        const contactId = mongoose.Types.ObjectId();

        params["contactId"] = contactId;

        return `/${params.companyId}/clients/${
          params.clientId
        }/contact/${contactId}/${randomString({
          length: 15,
        })}`;
      },
    }),
    parseFormDataToJSON,
    async (req, res) => {
      try {
        const {
          params: { companyId, clientId, contactId },
          //@ts-ignore
          user,
          body: { name, description, email, phoneNumber, notes },
          files,
        } = req;

        const { status, message } = await addContact({
          userId: user._id,
          companyId,
          clientId,
          contactId: (contactId as any) || mongoose.Types.ObjectId(),
          name,
          description,
          email,
          phoneNumber,
          notes,
          files: files as any[],
        });

        res.status(status).send({ message });
      } catch (caught: any) {
        const { status, error } = caught;

        res.status(status).send({ error });
      }
    }
  );

export { router };
