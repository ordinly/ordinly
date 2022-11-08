import { PUT } from "../../requests";

export type UpdateWorkerArgs = {
  companyId: string;
  workerId: string;
  role: string;
  status: string;
};

export const updateWorker = async ({
  companyId,
  workerId,
  role,
  status,
}: UpdateWorkerArgs) => {
  try {
    const response = await PUT({
      endpoint: `/api/company/${companyId}/workers/${workerId}`,
      body: { role, status },
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this worker's info",
    } = caught;

    return { status, error };
  }
};
