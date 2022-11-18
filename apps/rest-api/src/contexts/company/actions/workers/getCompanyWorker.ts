import { Company } from "@db/restAPIConnection/schemas/Company";
import { User } from "@db/restAPIConnection/schemas/User";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type GetWorkerProps = {
  companyId: string;
  userId: string;
  workerId: string;
};

export default async ({
  companyId,
  userId,
  workerId,
}: GetWorkerProps): APIResponse<{
  worker: any;
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

    const worker = company?.workers?.find(
      ({ _id }) => _id?.toString() === workerId.toString()
    );

    const user = await User.findOne({ _id: worker?.userId });

    return {
      status: 200,
      message: "Worker fetched",
      worker: {
        _id: worker?._id,
        userId: worker?.userId,
        name: user?.name,
        roleId: worker?.roleId,
        status: worker?.status,
        joined: worker?.joined,
        email: user?.email || worker?.email,
        canEdit: userPermissions?.people?.workers?.edit,
        canRemove: userPermissions?.people?.workers?.remove,
      },
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error fetching this worker",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
