import { UPLOAD } from "../../../requests";

export type AddUserTaskArgs = {
  projectId: string;
  name: string;
  dueDate?: string;
  description?: string;
  assignedVendors?: string[];
};

export const addUserTask = async ({ projectId, ...rest }: AddUserTaskArgs) => {
  try {
    const response = await UPLOAD({
      endpoint: `/api/user/projects/${projectId}/tasks`,
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
      error = "There was an error adding this task",
    } = caught;

    throw { status, error };
  }
};
