import { GET } from "../requests";

export type CompanyReview = {
  _id: string;
  userId: string;
  companyId: string;
  details: string;
  rating: number;
};

export const getCompanyReview = async ({
  companyId,
  reviewId,
}: {
  companyId: string;
  reviewId: string;
}) => {
  try {
    const response = await GET<{ review: CompanyReview }>({
      endpoint: `/api/company/${companyId}/reviews/${reviewId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching this review",
    } = caught;

    return { status, error };
  }
};
