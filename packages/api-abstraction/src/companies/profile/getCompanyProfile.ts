import { GET } from "../../requests";

export type CompanyProfile = {
  _id: string;
  name: string;
  tagline?: string;
  description?: string;
  tags?: string[];
  rating: { numberOfReviews: number; rating: number };
  location?: {
    country?: string;
    region?: string;
    city?: string;
    streetAddress?: string;
  };
};

export const getCompanyProfile = async ({
  companyId,
}: {
  companyId: string;
}) => {
  try {
    const response = await GET<{ company: CompanyProfile }>({
      endpoint: `/api/company/${companyId}/profile`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching this profile",
    } = caught;

    return { status, error };
  }
};
