import { UPLOAD } from "../requests";

export type UpdateCompanyProfilePicture = {
  companyId: string;
  file: any;
};

export const updateCompanyProfilePicture = async ({
  companyId,
  file,
}: UpdateCompanyProfilePicture) => {
  try {
    const response = await UPLOAD({
      endpoint: `/api/company/${companyId}/profile-picture`,
      body: { profilePicture: file },
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this company's profile picture",
    } = caught;

    return { status, error };
  }
};
