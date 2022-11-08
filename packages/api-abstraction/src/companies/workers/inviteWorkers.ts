import { POST } from "../../requests";

export type InviteWorkersArgs = {
  _id: string;
  invitations: string[];
};

export const inviteWorkers = async ({ _id, ...rest }: InviteWorkersArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/company/${_id}/workers`,
      body: rest,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error inviting these workers",
    } = caught;

    throw { status, error };
  }
};
