import { GET } from "../requests";

export type City = {
  name: string;
};

export type GetCitiesResponse = {
  regions: City[];
};

export const getCities = async ({
  countryId,
  regionId,
}: {
  countryId: string;
  regionId: string;
}) => {
  try {
    const response = await GET<GetCitiesResponse>({
      endpoint: `/api/location/cities?country=${countryId}&region=${regionId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these cities",
    } = caught;

    return { status, error };
  }
};
