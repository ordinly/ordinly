import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type RemoveTeamProps = {
  companyId: string;
  teamId: string;
  userId: string;
};

export default async ({
  companyId,
  teamId,
  userId,
}: RemoveTeamProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions.people.teams.remove) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to remove a team",
      };
    }

    const team = company.teams.find(({ _id }) => _id?.toString() === teamId);

    if (!team) {
      throw { status: 404, error: "Team not found" };
    }

    company.teams = company.teams.filter(
      ({ _id }) => _id?.toString() !== teamId
    );

    await company.save();

    return {
      status: 200,
      message: "Team successfully removed from company",
    };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error removing this team from this company",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
