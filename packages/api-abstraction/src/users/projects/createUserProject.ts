import { POST } from "../../requests";

export type CreateUserProjectArgs = {
  name: string;
  description: string;
};

export const createUserProject = async ({ ...rest }: CreateUserProjectArgs) => {
  try {
    const response = await POST({
      endpoint: `/api/user/projects`,
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
      error = "There was an error creating this project",
    } = caught;

    throw { error };
  }
};
