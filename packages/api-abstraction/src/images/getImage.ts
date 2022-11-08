import { GET } from "../requests";

export const getImage = async ({ src }: { src: string }) => {
  try {
    const response = await GET<{ image: File }>({
      type: "image/*",
      endpoint: src,
    });

    return response;
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching this image ",
    } = caught;

    return { status, error };
  }
};
