import mongoose from "mongoose";

import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type CreateClientProps = {
  companyClient?: string;
  name?: string;
  description: string;
  companyId: string;
  userId: string;
  contacts: {
    name: string;
    email: string;
    phoneNumber?: number;
  }[];
  address?: {
    country?: string;
    region?: string;
    city?: string;
    postalCode?: string;
    streetAddress?: string;
  };
};

export default async ({
  name,
  description,
  companyId,
  companyClient,
  userId,
  contacts = [],
  address,
}: CreateClientProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.clients.clients.add) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to add a client",
      };
    }

    let companyClientDoc;

    if (companyClient) {
      companyClientDoc = await Company.findOne({ _id: companyClient });

      if (!companyClientDoc) {
        throw { status: 404, error: "Client company not found" };
      }
    }

    company.clients.push({
      _id: mongoose.Types.ObjectId(),
      name,
      companyId: companyClientDoc?._id,
      description: description ? JSON.stringify(description) : undefined,
      contacts: contacts.map((contact) => ({
        ...contact,
        _id: mongoose.Types.ObjectId(),
      })),
      address,
      createdAt: new Date(),
      createdBy: userId,
    });

    await company.save();

    return { status: 201, message: "Client created" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error creating this client",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
