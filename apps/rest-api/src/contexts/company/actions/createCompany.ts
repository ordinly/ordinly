import mongoose from "mongoose";

import { Company } from "@db/restAPIConnection/schemas/Company";
import defaultRoles from "@db/static/defaultRoles.json";

import type { APIResponse } from "@contexts/shared/types";

export type CreateCompanyProps = {
  companyId?: string;
  userId: string;
  name: string;
  profilePicture?: { key: any; name: string };
};

export default async ({
  companyId,
  userId,
  profilePicture,
  name,
}: CreateCompanyProps): APIResponse<{ companyId: string }> => {
  try {
    const now = new Date();

    const _id = mongoose.Types.ObjectId(companyId);

    const newCompany = await Company.create({
      _id,
      owner: userId,
      name,
      createdBy: userId,
      createdAt: now,
      workers: [
        {
          _id: new mongoose.Types.ObjectId(),
          userId,
          status: "active",
          joined: now,
        },
      ],
      profile: {},
      projects: [],
      teams: [],
      profilePicture,
      roles: defaultRoles.map((role) => ({
        ...role,
        createdBy: userId,
        createdAt: now,
      })),
    });

    newCompany.save();

    if (!newCompany) {
      throw { status: 500, error: "There was an error creating this company" };
    }

    return {
      status: 201,
      message: "Company successfully created",
      companyId: newCompany._id,
    };
  } catch (caught: any) {
    console.log("CAUGHT", caught);
    const {
      status = 500,
      error = "There was an error creating this company",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
