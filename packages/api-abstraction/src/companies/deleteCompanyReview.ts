import { DELETE } from "../requests";

export type DeleteCompanyReviewArgs = {
  companyId: string;
  reviewId: string;
};

export const deleteCompanyReview = async ({
  companyId,
  reviewId,
}: DeleteCompanyReviewArgs) => {
  try {
    const response = await DELETE({
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
      error = "There was an error deleting this company review",
    } = caught;

    return { status, error };
  }
};
