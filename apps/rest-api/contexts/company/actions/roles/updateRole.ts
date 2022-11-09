import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type UpdateRoleProps = {
  companyId: string;
  roleId: string;
  name: string;
  description: string;
  permissions: any;
  userId: string;
};

export default async ({
  companyId,
  roleId,
  name,
  description,
  permissions,
  userId,
}: UpdateRoleProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.people.roles.edit) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to update this role",
      };
    }

    const role = company.roles.find(({ _id }) => _id?.toString() === roleId);

    if (!role) {
      throw { status: 404, error: "Role not found" };
    }

    role.name = name;
    role.description = description;
    role.permissions = permissions;

    await company.save();

    return { status: 200, message: "Role successfully updated" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this role's info",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
