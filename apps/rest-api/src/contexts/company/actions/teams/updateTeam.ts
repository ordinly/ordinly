import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type UpdateTeamProps = {
  companyId: string;
  teamId: string;
  name: string;
  description: string;
  members: string[];
  userId: string;
};

export default async ({
  companyId,
  teamId,
  name,
  description,
  members,
  userId,
}: UpdateTeamProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    const team = company.teams.find(({ _id }) => _id?.toString() === teamId);

    if (!team) {
      throw { status: 404, error: "Team not found" };
    }

    const assigned = team?.members.includes(userId);

    if (
      !userPermissions.people.teams.nonAssigned.edit &&
      !(assigned && userPermissions.people.teams.assigned.edit)
    ) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to update this team",
      };
    }

    team.name = name;
    team.description = description;
    team.members = members;

    await company.save();

    return { status: 200, message: "Team successfully updated" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this team's info",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
