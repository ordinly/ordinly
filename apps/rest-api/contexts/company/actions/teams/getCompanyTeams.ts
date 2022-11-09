import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type GetTeamsProps = {
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
}: GetTeamsProps): APIResponse<{
  teams: any[];
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

    const teams = company.teams.filter(
      ({ name, description }) =>
        name.toLowerCase().includes(searchTerm) ||
        description?.toLowerCase().includes(searchTerm)
    );

    return {
      status: 200,
      message: "Teams fetched",
      teams: teams.slice(page - 1 * pageSize, page * pageSize),
      total: teams.length,
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error fetching these workers",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
