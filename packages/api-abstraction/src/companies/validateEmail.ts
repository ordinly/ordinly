import { GET } from "../requests";

export const validateEmail = async ({
  emailAddress,
  companyId,
  exists,
}: {
  emailAddress: string;
  companyId?: string;
  exists?: boolean;
}) => {
  try {
    const response = await GET({
      endpoint: `/api/company/validate-email?email-address=${emailAddress}${
        companyId ? `&company-id=${companyId}` : ""
      }${exists ? `&exists=${exists}` : ""}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error validating this email address",
    } = caught;

    throw { status, error };
  }
};
