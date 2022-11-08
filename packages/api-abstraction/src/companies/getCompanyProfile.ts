import { GET } from "../requests";

export type CompanyProfile = {
  _id: string;
  name: string;
  description?: string;
  rating: { rating: number; numberOfReviews: number };
  profilePicture: any;
  coverPicture: any;
  team: [];
  projects: [];
  priceBook: [];
  posts: [];
  career: [];
  tags: string[];
};

export const getCompanyProfile = async ({ companyId }) => {
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
      error = "There was an error fetching this company's profile",
    } = caught;

    return { status, error };
  }
};
