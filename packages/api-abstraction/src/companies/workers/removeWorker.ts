import { DELETE } from "../../requests";

export type RemoveWorkerArgs = {
  companyId: string;
  workerId: string;
};

export const removeWorker = async ({
  companyId,
  workerId,
}: RemoveWorkerArgs) => {
  try {
    const response = await DELETE({
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
      error = "There was an error removing this worker from this company",
    } = caught || {};

    return { status, error };
  }
};
