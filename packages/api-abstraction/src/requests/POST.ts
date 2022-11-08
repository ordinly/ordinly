import { isSuccess } from "./";

import type { APIResponse } from "./";

import { config } from "../initialize";

type POSTProps = {
  endpoint: string;
  body?: { [key: string]: any };
};

const POST = async <T = {}>({
  endpoint,
  body,
}: POSTProps): Promise<APIResponse & T> => {
  try {
    const response = await fetch(`${config?.host || ""}${endpoint}`, {
      method: "POST",
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
  } catch (caught: any) {
    const { response } = caught;

    if (
      (!["/api/user/login", "/api/user/persistent-login"].includes(endpoint) ||
        endpoint.includes("/marketplace")) &&
      response?.status === 401
    ) {
      //window.location.href = `/landing?form=login`;
    }

    throw await await response.json();
  }
};

export default POST;
