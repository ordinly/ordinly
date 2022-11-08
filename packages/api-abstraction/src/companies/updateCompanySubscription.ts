import { PUT } from "../requests";

type UpdateCompanySubscriptionProps = {
  companyId: string;
};

export const updateCompanySubscription = async ({
  companyId,
}: UpdateCompanySubscriptionProps) => {
  try {
    const response = await PUT<{ sessionURL: string }>({
      endpoint: `/api/stripe/subscription/${companyId}`,
      body: {},
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error creating this session",
    } = caught;

    throw { status, error };
  }
};
