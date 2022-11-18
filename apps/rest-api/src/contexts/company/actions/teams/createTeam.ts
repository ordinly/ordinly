import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type CreateTeamProps = {
  name: string;
  description: string;
  members: string[];
  companyId: string;
  userId: string;
};

export default async ({
  name,
  description,
  members,
  companyId,
  userId,
}: CreateTeamProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions: userPermissions } = getCompanyUserPermissions({
      company,
      userId: userId,
    });

    if (!userPermissions?.people.teams.add) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to add a team",
      };
    }

    company.teams.push({
      name,
      description,
      members,
      createdAt: new Date(),
      createdBy: userId,
    });

    await company.save();

    return { status: 201, message: "Team created" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error creating this team",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
