import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type GetRolesProps = {
  companyId: string;
  userId: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
};

export default async ({
  companyId,
  userId,
  page = 1,
  pageSize = 10,
  searchTerm = "",
}: GetRolesProps): APIResponse<{
  roles: any[];
  total: number;
}> => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    getCompanyUserPermissions({
      company,
      userId,
    });

    const roles = company.roles.reduce((total, { name, description, _id }) => {
      if (
        name.toLowerCase().includes(searchTerm) ||
        description?.toLowerCase().includes(searchTerm)
      ) {
        return [...total, { name, description, _id }];
      }

      return total;
    }, [] as any);

    return {
      status: 200,
      message: "Roles fetched",
      roles: roles.slice(page - 1 * pageSize, page * pageSize),
      total: roles.length,
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error fetching these roles",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
