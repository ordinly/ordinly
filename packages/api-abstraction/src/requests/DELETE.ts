import { isSuccess } from "./";

import type { APIResponse } from "./";

import { config } from "../initialize";

type DELETEProps = { endpoint: string };

const DELETE = async ({ endpoint }: DELETEProps): Promise<APIResponse> => {
  try {
    const response = await fetch(`${config?.host || ""}${endpoint}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (isSuccess(response.status)) {
      return await response.json();
    } else {
      throw { response };
    }
  } catch (error: any) {
    const { response } = error;

    if (response?.status === 401) {
      window.location.href = `/?form=login`;
    }

    const { errorMessage } = await response.json();
    throw errorMessage;
  }
};

export default DELETE;
