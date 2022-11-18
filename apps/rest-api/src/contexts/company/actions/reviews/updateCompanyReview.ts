import { Review } from "@db/restAPIConnection/schemas/Review";

import type { APIResponse } from "@contexts/shared/types";

export default async ({
  userId,
  companyId,
  reviewId,
  details,
  rating,
  title,
}: {
  userId: string;
  companyId: string;
  reviewId: string;
  details: string;
  rating: number;
  title: string;
}): APIResponse => {
  try {
    const review = await Review.findOne({ companyId, userId, _id: reviewId });

    if (!review) {
      throw { status: 404, error: "Review not found" };
    }

    if (!details || !Number.isInteger(rating)) {
      throw { status: 412, error: "Incorrect format" };
    }

    review.title = title;
    review.details = JSON.stringify(details);
    review.rating = rating;

    return {
      status: 200,
      message: "Review updated",
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error updating this review",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
