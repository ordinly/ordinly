import { Review } from "@db/restAPIConnection/schemas/Review";

import type { APIResponse } from "@contexts/shared/types";

export default async ({
  details,
  rating,
  userId,
  companyId,
  title,
}: {
  details: string;
  rating: number;
  userId: string;
  companyId: string;
  title: string;
}): APIResponse => {
  try {
    const review = await Review.findOne({ companyId, userId });

    if (review) {
      throw {
        status: 409,
        error: "A review for this company by this user already exists",
      };
    }

    await Review.create({
      details: JSON.stringify(details),
      rating,
      userId,
      companyId,
      title,
    });

    return {
      status: 200,
      message: "Review added",
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error adding this review",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
