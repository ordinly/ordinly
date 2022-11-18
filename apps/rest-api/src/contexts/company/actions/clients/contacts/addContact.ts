import { Company } from "@db/restAPIConnection/schemas/Company";
import { File } from "@db/restAPIConnection/schemas/File";

import { removeSingle } from "@services/documents";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

import type { Schema as SchemaType } from "mongoose";

type CreateContactProps = {
  name: string;
  email?: string;
  phoneNumber?: string;
  description?: string;
  companyId: string;
  clientId: string;
  contactId?: SchemaType.Types.ObjectId;
  userId: string;
  files?: any[];
  notes?: any[];
};

export default async ({
  name,
  email,
  phoneNumber,
  description,
  companyId,
  contactId,
  clientId,
  userId,
  notes = [],
  files = [],
}: CreateContactProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const client = company.clients.find(
      ({ _id }) => clientId === _id?.toString()
    );

    if (!client) {
      throw { status: 404, error: "Client not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.clients?.contacts?.add) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to add a contact",
      };
    }

    const fileIds = [];

    for (let i = 0; i < files.length; i++) {
      const { originalname, key, size, mimetype, bucket } = files[i];

      const newFile = await File.create({
        name: originalname,
        key,
        createdAt: new Date(),
        size,
        mimetype,
        createdBy: userId,
        bucket,
      });

      if (!newFile) {
        await removeSingle({
          bucket,
          key,
        });

        throw { status: 500, error: "Error uploading file" };
      }

      fileIds.push(newFile._id);
    }

    const now = new Date();

    client.contacts.push({
      _id: contactId,
      name,
      email,
      phoneNumber: phoneNumber ? Number(phoneNumber) : undefined,
      description,
      notes: notes.map((text) => ({ userId, text, createdDate: now })),
      files: fileIds,
    });

    await company.save();

    return { status: 201, message: "Contact created" };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error creating this contact",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
