import { Review } from "@db/restAPIConnection/schemas/Review";

import type { APIResponse } from "@contexts/shared/types";

export default async ({
  userId,
  companyId,
  reviewId,
}: {
  userId: string;
  companyId: string;
  reviewId: string;
}): APIResponse<{ review: any }> => {
  try {
    const review = await Review.findOne({
      companyId,
      userId,
      _id: reviewId,
    });

    if (!review) {
      throw { status: 404, error: "Review not found" };
    }

    const { title, rating, details } = review;

    return {
      status: 200,
      message: "Review found",
      review: {
        title,
        rating,
        details: JSON.parse(details),
      },
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error fetching this review",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
