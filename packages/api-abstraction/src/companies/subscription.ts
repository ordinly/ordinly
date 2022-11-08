import { POST } from "../requests";

type SubscriptionProps = {
  companyId: string;
};

export const subscribe = async ({ companyId }: SubscriptionProps) => {
  try {
    const response = await POST<{ sessionId: string }>({
      endpoint: `/api/stripe/subscription`,
      body: {
        companyId,
      },
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error creating a subscription",
    } = caught;

    throw { status, error };
  }
};
