import mongoose from "mongoose";

import { Company } from "@db/restAPIConnection/schemas/Company";

import type { APIResponse } from "@contexts/shared/types";

type CompanyType = {
  _id: string;
  name: string;
  description?: string;
  profilePicture: { key: string; name: string };
  public: boolean;
  emailAddress: string;
  phoneNumber: string;
  tags: string[];
  reviews: string[];
  rating: number;
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
}): APIResponse<{ companies: CompanyType[]; total: number }> => {
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
        companies,
        info: [{ total } = { total: 0 }],
      },
    ] = await Company.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [{ name: { $regex: new RegExp(`${searchTerm}`, "gi") } }],
            },
            ...query,
          ],
          deletedAt: { $exists: false },
        },
      },
      { $addFields: { _id: { $toString: "$_id" } } },
      {
        $lookup: {
          from: "Reviews",
          localField: "_id",
          foreignField: "companyId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          rating: { $avg: "$reviews.rating" },
        },
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

    if (!companies) {
      throw { status: 404, error: "No companies found" };
    }

    return {
      status: 200,
      message: "Companies fetched",
      companies: companies?.map((company: CompanyType) => ({
        _id: company._id,
        name: company.name,
        description: company.description,
        profilePicture: company.profilePicture,
        public: company.public,
        emailAddress: company.emailAddress,
        phoneNumber: company.phoneNumber,
        tags: company.tags ?? [],
        rating: {
          rating: company.rating?.toFixed(1),
          numberOfReviews: company.reviews.length,
        },
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
