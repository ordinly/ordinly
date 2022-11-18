import { Company } from "@db/restAPIConnection/schemas/Company";

import type { APIResponse } from "@contexts/shared/types";

import type { Schema as SchemaType } from "mongoose";

export default async ({
  companyId,
  clientId,
  page = 1,
  pageSize = 15,
  searchTerm = "",
}: {
  companyId: string;
  clientId: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}): APIResponse<{
  contacts: {
    name: string;
    emailAddress?: string;
    _id?: SchemaType.Types.ObjectId;
    phoneNumber?: string;
    description?: string;
  }[];
  total: number;
}> => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const client = company.clients.find(
      ({ _id }) => _id?.toString() === clientId
    );

    if (!client) {
      throw { status: 404, error: "Client not found" };
    }

    const contacts = client.contacts.reduce(
      (total, { _id, name, email, phoneNumber, description }) => {
        if (name.toLowerCase().includes(searchTerm.toLowerCase())) {
          return [
            ...total,
            {
              _id,
              name,
              email,
              phoneNumber,
              description,
            },
          ];
        }
        return total;
      },
      [] as any
    );

    return {
      status: 200,
      message: "Contacts fetched",
      contacts: contacts.slice(page - 1 * pageSize, page * pageSize),
      total: contacts.length,
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error fetching your contacts",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
