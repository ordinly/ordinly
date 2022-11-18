import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type RemoveContactProps = {
  contactId: string;
  companyId: string;
  clientId: string;
  userId: string;
};

export default async ({
  contactId,
  companyId,
  clientId,
  userId,
}: RemoveContactProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.clients?.contacts?.remove) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to remove a contact",
      };
    }

    const client = company.clients.find(
      ({ _id }) => clientId === _id?.toString()
    );

    if (!client) {
      throw { status: 404, error: "Client not found" };
    }

    client.contacts = client.contacts.filter(
      ({ _id }) => _id?.toString() !== contactId
    );

    await company.save();

    return { status: 201, message: "Contact removed" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error removing this contact",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
