import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type GetTeamProps = {
  companyId: string;
  userId: string;
  teamId: string;
};

export default async ({
  companyId,
  userId,
  teamId,
}: GetTeamProps): APIResponse<{
  team: any;
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

    const { _id, name, description, members } =
      company?.teams?.find(
        ({ _id }) => _id?.toString() === teamId.toString()
      ) || {};

    const workerId = company?.workers?.find(
      ({ userId: workerUserId }) =>
        workerUserId?.toString() === userId?.toString()
    )?._id;

    const workerAssigned = members?.includes(workerId);

    return {
      status: 200,
      message: "Team fetched",
      team: {
        _id,
        name,
        description,
        members,
        canEdit:
          userPermissions?.people?.teams?.nonAssigned?.edit ||
          (workerAssigned && userPermissions?.people?.teams?.assigned?.edit),
        canRemove: userPermissions?.people?.teams?.remove,
      },
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error fetching this team",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
