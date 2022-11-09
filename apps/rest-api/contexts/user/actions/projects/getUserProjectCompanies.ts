import { Project } from "@db/restAPIConnection/schemas/Project";
import { Company } from "@db/restAPIConnection/schemas/Company";
import { Invitation } from "@db/restAPIConnection/schemas/Invitation";

import type { APIResponse } from "@contexts/shared/types";

export default async ({
  projectId,
  page = 1,
  pageSize = 15,
  searchTerm = "",
}: {
  userId?: string;
  projectId: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}): APIResponse<{
  companies: [];
  total: number;
}> => {
  try {
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      throw { status: 404, error: "Project not found" };
    }

    const invitations = await (
      await Invitation.find({
        "from.projectId": project._id,
        accepted: { $exists: false },
        revoked: { $exists: false },
      })
    )?.map(({ _id, to: { companyId }, from: { permissions }, createdAt }) => ({
      _id,
      companyId,
      permissions,
      createdAt,
    }));

    const [
      {
        companies,
        info: [{ total } = { total: 0 }],
      },
    ] = await Company.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                {
                  _id: {
                    $in: project.companies.map(({ companyId }) => companyId),
                  },
                },
                {
                  _id: {
                    $in: invitations.map(({ companyId }) => companyId),
                  },
                },
              ],
            },
            {
              $or: [
                { name: { $regex: new RegExp(`${searchTerm}`, "gi") } },
                {
                  description: { $regex: new RegExp(`${searchTerm}`, "gi") },
                },
              ],
            },
          ],

          deletedAt: { $exists: false },
        },
      },
      {
        $project: { _id: 1, name: 1 },
      },
      {
        $facet: {
          companies: [
            { $skip: (Number(page) - 1) * Number(pageSize) },
            { $limit: Number(pageSize) },
          ],
          info: [{ $count: "total" }],
        },
      },
    ]);

    return {
      status: 200,
      message: "Companies fetched",
      companies: companies.map(({ _id, ...restCompany }: any) => {
        const invitation = invitations.find(
          ({ companyId }) => _id.toString() === companyId?.toString()
        );

        const projectCompany = project?.companies?.find(
          ({ companyId }) => companyId.toString() === _id.toString()
        );

        return {
          ...restCompany,
          _id,
          ...(projectCompany
            ? {
                permissions: projectCompany.permissions,
                addedOn: projectCompany.addedOn,
              }
            : {}),
          ...(invitation
            ? {
                permissions: invitation.permissions,
                pending: true,
                createdAt: invitation.createdAt,
                invitationId: invitation._id,
              }
            : {}),
        };
      }),
      total,
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error fetching these companies",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
