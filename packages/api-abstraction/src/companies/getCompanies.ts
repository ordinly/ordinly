import { GET } from "../requests";

export type WorkCompany = {
  _id: string;
  owner: string;
  name: string;
  description?: string;
  profilePicture: { key: string; name: string };
  public: boolean;
  workers: {
    email: string;
    name: string;
    joined: Date;
    status: string;
    _id: string;
  }[];
  teams: {
    createdAt: Date;
    createdBy: Date;
    description: string;
    members: string[];
    name: string;
    _id: string;
  }[];
  clients: { name: string }[];
  active: boolean;
};

export type GetCompaniesResponse = {
  companies: WorkCompany[];
};

export const getCompanies = async () => {
  try {
    const response = await GET<GetCompaniesResponse>({
      endpoint: "/api/company",
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching your companies",
    } = caught;

    return { status, error };
  }
};
