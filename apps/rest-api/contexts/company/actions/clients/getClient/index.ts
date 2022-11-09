import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

import type { Schema as SchemaType } from "mongoose";

type GetClientProps = {
  userId: string;
  companyId: string;
  clientId: string;
};

export type ClientType = {
  _id: SchemaType.Types.ObjectId;
  companyId?: SchemaType.Types.ObjectId;
  name?: string;
  description?: string;
  contacts: {
    _id: string;
    name: string;
    email?: string;
    phoneNumber?: number;
    files?: any[];
    notes?: any[];
  }[];
  address?: {
    country?: string;
    region?: string;
    city?: string;
    streetAddress?: string;
    postalCode?: string;
  };
} & ({ companyId: string } | { name: string });

export type Response = {
  _id?: string;
  name?: string;
  description?: string;
  contacts: {
    name: string;
    email?: string;
    phoneNumber?: number;
    files?: any[];
    notes?: any[];
  }[];
  address?: {
    country?: string;
    region?: string;
    city?: string;
    streetAddress?: string;
    postalCode?: string;
  };
  companyId?: SchemaType.Types.ObjectId;
};

export default async ({
  userId,
  companyId,
  clientId,
}: GetClientProps): APIResponse<{ client: Response }> => {
  try {
    const company = await Company.findOne({
      _id: companyId,
      workers: { $elemMatch: { userId } },
      deletedAt: { $exists: false },
    });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    getCompanyUserPermissions({
      company,
      userId: userId,
    });

    const client = company.clients.find(
      ({ _id }) => clientId?.toString() === _id?.toString()
    );

    if (!client) {
      throw {
        status: 404,
        error: "Client not found",
      };
    }

    let clientCompany;

    if (client.companyId) {
      clientCompany = await Company.findOne({
        _id: client.companyId,
      });

      if (!clientCompany) {
        throw { status: 404, error: "Client company not found" };
      }
    }

    return {
      status: 200,
      message: "Client fetched",
      client: {
        _id: client._id?.toString(),
        name: clientCompany?.name || client.name,
        description: client.description
          ? JSON.parse(client.description)
          : undefined,
        contacts: client.contacts,
        address: client.address,
        companyId: clientCompany?._id,
      },
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error fetching this client",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
