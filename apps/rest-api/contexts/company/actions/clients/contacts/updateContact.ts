import { Company } from "@db/restAPIConnection/schemas/Company";
import { File } from "@db/restAPIConnection/schemas/File";

import { removeSingle } from "@services/documents";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type UpdateContactProps = {
  name: string;
  email?: string;
  phoneNumber?: string;
  description?: string;
  contactId: string;
  companyId: string;
  clientId: string;
  userId: string;
  files?: any[];
  existingFiles?: any[];
  notes: any[];
};

export default async ({
  name,
  email,
  phoneNumber,
  description,
  contactId,
  companyId,
  clientId,
  userId,
  files = [],
  notes,
  existingFiles,
}: UpdateContactProps): APIResponse => {
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

    if (!userPermissions?.clients?.contacts?.edit) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to edit a contact",
      };
    }

    const contact = client.contacts.find(
      ({ _id }) => _id?.toString() === contactId
    );

    if (!contact) {
      throw { status: 404, error: "Contact not found" };
    }

    const fileIds = existingFiles?.map(({ _id }) => _id) || [];

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

    const filesToRemove = (contact?.files || []).filter(
      (_id) => !fileIds.includes(_id.toString())
    );

    for (let i = 0; i < filesToRemove.length; i++) {
      const current = await File.findOne({ _id: filesToRemove[i] });

      if (current) {
        const { bucket, key } = current;

        await removeSingle({
          bucket,
          key,
        });
      }
    }

    contact.name = name;
    contact.email = email;
    contact.phoneNumber = phoneNumber ? Number(phoneNumber) : undefined;
    contact.description = description;
    contact.files = fileIds;
    contact.notes = (notes || []).map((value) =>
      value._id ? value : { userId, text: value, createdDate: new Date() }
    );

    await company.save();

    return { status: 201, message: "Contact updated" };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error updating this contact",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
