import { GET } from "../requests";

export type Country = {
  name: string;
  iso: string;
};

export type GetCountriesResponse = {
  countries: Country[];
};

export const getCountries = async () => {
  try {
    const response = await GET<GetCountriesResponse>({
      endpoint: "/api/location/countries",
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these countries",
    } = caught;

    return { status, error };
  }
};
