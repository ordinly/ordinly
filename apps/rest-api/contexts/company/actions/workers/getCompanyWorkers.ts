import mongoose from "mongoose";

import { Company } from "@db/restAPIConnection/schemas/Company";
import { User } from "@db/restAPIConnection/schemas/User";

import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type GetWorkersProps = {
  companyId: string;
  userId: string;
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  _ids?: string;
};

export default async ({
  companyId,
  userId,
  page = 1,
  pageSize = 10,
  searchTerm = "",
  _ids,
}: GetWorkersProps): APIResponse<{
  workers: any[];
  total: number;
}> => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    getCompanyUserPermissions({
      company,
      userId,
    });

    const workerUserIds = company.workers.reduce(
      (total, { userId }) =>
        userId ? [...total, mongoose.Types.ObjectId(userId)] : total,
      [] as any
    );

    const query = [];

    if (_ids) {
      query.push({
        _id: {
          $in: _ids.split(",").map((_id) => mongoose.Types.ObjectId(_id)),
        },
      });
    }

    const [
      {
        workers,
        info: [{ total } = { total: 0 }],
      },
    ] = await User.aggregate([
      {
        $match: {
          $and: [
            { _id: { $in: workerUserIds } },
            {
              $or: [
                { name: { $regex: new RegExp(`${searchTerm}`, "gi") } },
                { email: { $regex: new RegExp(`${searchTerm}`, "gi") } },
              ],
            },
            ...query,
          ],
          deletedAt: { $exists: false },
        },
      },
      { $project: { name: 1, _id: 1, email: 1 } },
      {
        $facet: {
          workers: [
            { $skip: (Number(page) - 1) * Number(pageSize) },
            { $limit: Number(pageSize) },
          ],
          info: [{ $count: "total" }],
        },
      },
    ]);

    const responseWorkers = workers.map(({ _id, ...rest }: any) => {
      const worker = company.workers.find(
        ({ userId }) => _id.toString() === userId?.toString()
      );

      if (worker) {
        return {
          ...rest,
          joined: worker.joined,
          status: worker.status,
          userId: worker.userId,
          roleId: worker.roleId,
          _id: worker._id,
        };
      }
    });

    if (responseWorkers?.length < pageSize) {
      const start = page - 1 * (pageSize - responseWorkers?.length);

      company.workers
        .filter(
          ({ userId, email }) =>
            !userId && email?.toLowerCase()?.includes(searchTerm)
        )
        .slice(start, page * pageSize)
        .forEach((worker) => {
          responseWorkers.push(worker);
        });
    }

    return {
      status: 200,
      message: "Workers fetched",
      workers: responseWorkers,
      total: total,
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error fetching these workers",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
