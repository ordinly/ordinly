import mongoose from "mongoose";

import { User } from "@db/restAPIConnection/schemas/User";

import type { APIResponse } from "@contexts/shared/types";

type UserType = {
  _id: string;
  name: string;
  email: string;
};

export default async ({
  page = 1,
  pageSize = 10,
  searchTerm = "",
  exclude = "",
  ids = "",
}: {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  exclude?: string;
  ids?: string;
}): APIResponse<{ users: UserType[]; total: number }> => {
  const query = [];

  if (ids) {
    query.push({ _id: { $in: ids.split(",") } });
  }

  if (exclude) {
    query.push({
      _id: {
        $nin: exclude.split(",").map((_id) => mongoose.Types.ObjectId(_id)),
      },
    });
  }

  try {
    const [
      {
        users,
        info: [{ total } = { total: 0 }],
      },
    ] = await User.aggregate([
      {
        $match: {
          $and: [
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
      {
        $facet: {
          users: [
            { $skip: (Number(page) - 1) * Number(pageSize) },
            { $limit: Number(pageSize) },
          ],
          info: [{ $count: "total" }],
        },
      },
    ]);

    if (!users) {
      throw { status: 404, error: "No companies found" };
    }

    return {
      status: 200,
      message: "Users fetched",
      users: users?.map((user: UserType) => ({
        _id: user._id,
        name: user.name,
        email: user.email,
      })),
      total,
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error searching these companies",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
