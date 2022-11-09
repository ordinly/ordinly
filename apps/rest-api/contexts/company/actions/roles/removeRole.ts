import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type RemoveRoleProps = {
  companyId: string;
  roleId: string;
  userId: string;
};

export default async ({
  companyId,
  roleId,
  userId,
}: RemoveRoleProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.people.roles.remove) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to remove a role",
      };
    }

    if (
      company.workers.filter(
        ({ roleId: currentRoleId }) => currentRoleId?.toString() === roleId
      ).length
    ) {
      throw {
        status: 412,
        error: "You cannot remove a role that is assigned to any workers.",
      };
    }

    company.roles = company.roles.filter(
      ({ _id }) => _id?.toString() !== roleId
    );

    await company.save();

    return {
      status: 200,
      message: "Role successfully removed from company",
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error removing this role from this company",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
