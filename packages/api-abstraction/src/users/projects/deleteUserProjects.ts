import { DELETE } from "../../requests";

export type DeleteUserProjectArgs = {
  projectId: string;
};

export const deleteUserProject = async ({
  projectId,
}: DeleteUserProjectArgs) => {
  try {
    const response = await DELETE({
      endpoint: `/api/user/projects/${projectId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error deleting this project",
    } = caught;

    return { status, error };
  }
};
