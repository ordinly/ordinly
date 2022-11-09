import { Review } from "@db/restAPIConnection/schemas/Review";

import type { CompanyDocument } from "@db/restAPIConnection/schemas/Company";
import type { UserDocument } from "@db/restAPIConnection/schemas/User";

export default async ({
  company,
}: {
  company: CompanyDocument;
}): Promise<any> => {
  const reviews = await Review.aggregate([
    {
      $match: {
        companyId: company._id.toString(),
      },
    },
    { $addFields: { userId: { $toObjectId: "$userId" } } },
    {
      $lookup: {
        from: "Users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
  ]);

  let total = 0;

  let statistics: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    average?: number;
    numberOfReviews?: number;
  } = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  const response = reviews?.map(
    ({
      rating,
      details,
      user,
      createdAt,
    }: {
      rating: 1 | 2 | 3 | 4 | 5;
      details: string;
      user: UserDocument[];
      createdAt: string;
    }) => {
      total += rating;

      statistics[rating] = statistics[rating] += 1;

      return {
        rating,
        details,
        user: user
          ? {
              name: user[0].name,
              profilePicture: user[0].profile,
            }
          : undefined,
        createdAt,
      };
    }
  );

  return {
    statistics: {
      1: Math.ceil((statistics[1] / reviews.length) * 100),
      2: Math.ceil((statistics[2] / reviews.length) * 100),
      3: Math.ceil((statistics[3] / reviews.length) * 100),
      4: Math.ceil((statistics[4] / reviews.length) * 100),
      5: Math.ceil((statistics[5] / reviews.length) * 100),
      average: reviews.length ? (total / reviews.length).toFixed(1) : undefined,
      numberOfReviews: reviews.length,
    },
    //@ts-ignore
    reviews: response,
  };
};
