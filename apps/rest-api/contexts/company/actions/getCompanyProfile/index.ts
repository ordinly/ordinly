import { Company } from "@db/restAPIConnection/schemas/Company";
import { Review } from "@db/restAPIConnection/schemas/Review";

import type { APIResponse } from "@contexts/shared/types";

export default async ({
  companyId,
  userId,
}: {
  companyId: string;
  userId: string;
}): APIResponse<{ profile: any }> => {
  try {
    const company = await Company.findOne(
      {
        _id: companyId,
        deletedAt: { $exists: false },
      },
      {
        _id: 1,
        name: 1,
        profile: 1,
        workers: 1,
      }
    );

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const reviews = await Review.find({ companyId: company._id.toString() });

    const {
      workers,
      profile: { description, ...restProfile },
      name,
    } = company;

    return {
      status: 200,
      message: "Company profile fetched",
      profile: {
        name: name,
        description: description ? JSON.parse(description) : "",
        ...restProfile,
        reviews: {
          average: reviews?.length
            ? (
                reviews?.reduce((total, { rating }) => (total += rating), 0) /
                reviews.length
              ).toFixed(1)
            : undefined,
          numberOfReviews: reviews?.length,
        },
        userReview: reviews?.find(
          ({ userId: recordUserId }) =>
            recordUserId?.toString() === userId?.toString()
        )?._id,
        canEdit: workers?.find(
          ({ userId: recordUserId }) =>
            recordUserId?.toString() === userId?.toString()
        ),
      },
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error fetching this company's profile",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
