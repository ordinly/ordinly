import { isSuccess } from "./";

import type { APIResponse } from "./";

import { config } from "../initialize";

type PUTProps = {
  endpoint: string;
  body?: { [key: string]: any };
};

const PUT = async <T = {}>({
  endpoint,
  body,
}: PUTProps): Promise<APIResponse & T> => {
  try {
    const response = await fetch(`${config?.host || ""}${endpoint}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
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

export default PUT;
