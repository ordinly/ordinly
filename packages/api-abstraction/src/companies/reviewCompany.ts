import { POST } from "../requests";

export const reviewCompany = async ({
  companyId,
  ...body
}: {
  companyId: string;
} & { [key: string]: any }) => {
  try {
    const response = await POST({
      endpoint: `/api/company/${companyId}/reviews`,
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
      error = "There was an error adding this review",
    } = caught;

    return { status, error };
  }
};
