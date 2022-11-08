import { GET } from "../../requests";

export type GetCompanyWorkerArgs = {
  companyId: string;
  workerId: string;
};

export const getCompanyWorker = async ({
  companyId,
  workerId,
}: GetCompanyWorkerArgs) => {
  try {
    const response = await GET({
      endpoint: `/api/company/${companyId}/workers/${workerId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching this worker",
    } = caught;

    return { status, error };
  }
};
