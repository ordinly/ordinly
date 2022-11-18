import { Company } from "@db/restAPIConnection/schemas/Company";

import type { APIResponse } from "@contexts/shared/types";

type UpdateCompanyOwnerProps = {
  companyId: string;
  userId: string;
  onChangeOwner: "change-role" | "leave-company";
  newOwner: string;
  newRole?: string;
};

export default async ({
  companyId,
  userId,
  onChangeOwner,
  newOwner,
  newRole,
}: UpdateCompanyOwnerProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    if (userId === company?.owner.toString()) {
      throw {
        status: 403,
        error:
          "You don't have the necessary permissions to change this company's owner",
      };
    }

    const currentOwner = company.workers.find(
      ({ userId: workerId }) => workerId?.toString() === userId.toString()
    );

    if (!currentOwner) {
      throw {
        status: 404,
        error: "Owner not found",
      };
    }

    const newOwnerDoc = company.workers.find(
      ({ userId: workerId }) => workerId?.toString() === newOwner.toString()
    );

    if (!newOwnerDoc) {
      throw {
        status: 404,
        error: "New owner not found",
      };
    }

    if (onChangeOwner === "leave-company") {
      company.workers = company.workers.filter(
        ({ userId: workerId }) => workerId?.toString() !== userId.toString()
      );
    } else {
      currentOwner.roleId = newRole;
    }

    newOwnerDoc.roleId = undefined;

    company.owner = newOwner;

    await company.save();
    return { status: 200, message: "Company details updated" };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error updating this company",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
