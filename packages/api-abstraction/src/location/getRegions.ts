import { GET } from "../requests";

export type Region = {
  name: string;
};

export type GetRegionsResponse = {
  regions: Region[];
};

export const getRegions = async ({ countryId }: { countryId: string }) => {
  try {
    const response = await GET<GetRegionsResponse>({
      endpoint: `/api/location/regions?country=${countryId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching these regions",
    } = caught;

    return { status, error };
  }
};
