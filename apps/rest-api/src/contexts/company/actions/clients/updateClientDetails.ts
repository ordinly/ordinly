import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type UpdateClientDetailsProps = {
  companyId: string;
  clientId: string;
  name: string;
  description: string;
  userId: string;
};

export default async ({
  companyId,
  clientId,
  name,
  description,
  userId,
}: UpdateClientDetailsProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.clients?.clients.edit) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to edit a client",
      };
    }

    const client = company.clients?.find(
      ({ _id }) => _id?.toString() === clientId
    );

    if (!client) {
      throw { status: 404, error: "Client not found" };
    }

    client.name = name;
    client.description = description ? JSON.stringify(description) : undefined;

    await company.save();

    return { status: 200, message: "Client details updated" };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error updating this client",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
