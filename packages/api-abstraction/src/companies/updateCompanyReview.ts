import { PUT } from "../requests";

export const updateCompanyReview = async ({
  companyId,
  reviewId,
  ...body
}: { companyId: string; reviewId: string } & { [key: string]: any }) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/reviews/${reviewId}`,
      body,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this review",
    } = caught;

    return { status, error };
  }
};
