import { Company } from "@db/restAPIConnection/schemas/Company";

import type { APIResponse } from "@contexts/shared/types";

import type { Schema as SchemaType } from "mongoose";

export default async ({
  companyId,
  page = 1,
  pageSize = 15,
  searchTerm = "",
}: {
  companyId: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
}): APIResponse<{
  clients: {
    name: string;
    description?: string;
    _id?: SchemaType.Types.ObjectId;
    projects: SchemaType.Types.ObjectId[];
  }[];
  total: number;
}> => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const clients = await Company.aggregate([
      {
        $match: {
          $and: [
            {
              _id: {
                $in: company.clients.reduce(
                  (total, { companyId }) =>
                    companyId ? [...total, companyId] : total,
                  [] as SchemaType.Types.ObjectId[]
                ),
              },
            },
            {
              name: { $regex: new RegExp(`${searchTerm}`, "gi") },
            },
          ],
          deletedAt: { $exists: false },
        },
      },
      { $project: { name: 1 } },
    ]);

    console.log(company.clients);

    return {
      status: 200,
      message: "Clients fetched",
      clients: company.clients
        .reduce(
          (
            total,
            {
              _id: clientId,
              companyId: clientCompanyId,
              createdAt,
              createdBy,
              address,
              contacts,
              name,
              description,
            }
          ) => {
            const { name: clientName } =
              clients.find(
                ({ _id }: any) => _id.toString() === clientCompanyId?.toString()
              ) || {};

            if (
              (clientName &&
                clientName.toLowerCase().includes(searchTerm?.toLowerCase())) ||
              (name && name.toLowerCase().includes(searchTerm.toLowerCase()))
            ) {
              return [
                ...total,
                {
                  _id: clientId,
                  name: clientName || name,
                  companyId: clientCompanyId,
                  createdAt,
                  createdBy,
                  address,
                  contacts,
                  description: description
                    ? JSON.parse(description)
                    : undefined,
                },
              ];
            }

            return total;
          },
          [] as any[]
        )
        .slice(page - 1 * pageSize, page * pageSize),
      total: company.clients.length,
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error fetching your clients",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
