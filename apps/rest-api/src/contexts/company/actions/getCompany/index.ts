import { Company } from "@db/restAPIConnection/schemas/Company";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import getCompanyInvitations from "./getCompanyInvitations";

import type { APIResponse } from "@contexts/shared/types";

import type { GetCompanyProps, CompanyType } from "./types";

export default async ({
  userId,
  companyId,
}: GetCompanyProps): APIResponse<{ company: CompanyType }> => {
  try {
    const company = await Company.findOne({
      _id: companyId,
      workers: { $elemMatch: { userId, status: "active" } },
      deletedAt: { $exists: false },
    });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const { permissions } = getCompanyUserPermissions({ userId, company });

    const invitations = await getCompanyInvitations({ company });

    const workerId = company.workers.find(
      ({ userId: workerUserId }) =>
        userId?.toString() === workerUserId?.toString()
    )?._id;

    return {
      status: 200,
      message: "Company fetched",
      company: {
        _id: company._id,
        //This is guaranteed to be there, but TS doesn't know that
        //@ts-ignore
        owner: company.owner.toString(),
        permissions,
        workerId,
        name: company.name,
        description: company.description,
        public: company.public,
        roles: company.roles.reduce(
          (total, { _id }) => (_id ? [...total, _id.toString()] : total),
          [] as any
        ),
        teams: company.teams.reduce(
          (total, { _id }) => (_id ? [...total, _id.toString()] : total),
          [] as any
        ),
        workers: company.workers.reduce(
          (total, { _id, userId }) =>
            userId ? [...total, { _id, userId }] : total,
          [] as any
        ),
        invitations,
        emailAddress: company.emailAddress,
        phoneNumber: company.phoneNumber,
        subscription: { active: company.subscription?.active },
        clients: company.clients.reduce(
          (total, { _id }) => (_id ? [...total, _id.toString()] : total),
          [] as any
        ),
        address: company.address,
        tags: company.tags,
        projects: company?.projects?.map(({ projectId }) => projectId),
      },
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error fetching this company",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
