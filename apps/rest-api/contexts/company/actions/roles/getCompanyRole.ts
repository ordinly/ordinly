import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type GetRoleProps = {
  companyId: string;
  userId: string;
  roleId: string;
};

export default async ({
  companyId,
  userId,
  roleId,
}: GetRoleProps): APIResponse<{
  role: any;
}> => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId,
    });

    const { _id, name, description, permissions } =
      company?.roles?.find(
        ({ _id }) => _id?.toString() === roleId.toString()
      ) || {};

    return {
      status: 200,
      message: "Role fetched",
      role: {
        _id,
        name,
        description,
        permissions,
        canEdit: userPermissions?.people?.roles?.edit,
        canRemove: userPermissions?.people?.roles?.remove,
      },
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error fetching this role",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
