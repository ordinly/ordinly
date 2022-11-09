import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { Permissions } from "@db/restAPIConnection/schemas/Company/types";
import type { APIResponse } from "@contexts/shared/types";

type CreateRoleProps = {
  name: string;
  description: string;
  permissions: Permissions;
  companyId: string;
  userId: string;
};

export default async ({
  name,
  description,
  permissions,
  companyId,
  userId,
}: CreateRoleProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.people.roles.add) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to add a role",
      };
    }

    company.roles.push({
      name,
      description,
      permissions,
      createdAt: new Date(),
      createdBy: userId,
    });

    await company.save();

    return { status: 201, message: "Role created" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error creating this role",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
