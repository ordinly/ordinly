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
}): APIResponse => {
  try {
    const review = await Review.findOne({ companyId, userId, _id: reviewId });

    if (!review) {
      throw { status: 404, error: "Review not found" };
    }

    await review.remove();

    return {
      status: 200,
      message: "Review deleted",
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error deleting this review",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
