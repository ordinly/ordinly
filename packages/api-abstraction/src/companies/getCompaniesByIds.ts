import { GET } from "../requests";

type SearchCompaniesArgs = {
  ids: string[];
};

type SearchWorkCompany = {
  _id: string;
  name: string;
  description?: string;
};

type SearchCompaniesCompaniesResponse = {
  companies: SearchWorkCompany[];
};

export const getCompaniesByIds = async ({
  ids,
}: SearchCompaniesArgs): Promise<SearchCompaniesCompaniesResponse> => {
  try {
    const response = await GET<SearchCompaniesCompaniesResponse>({
      endpoint: `/api/company/search?ids=${ids.join()}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these companies",
    } = caught;

    throw { status, error };
  }
};
