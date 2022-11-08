import { isSuccess } from "./";

import type { APIResponse } from "./";

import { config } from "../initialize";

type UPLOADProps = {
  action?: "POST" | "PUT";
  endpoint: string;
  body?: { [key: string]: any };
};

const UPLOAD = async <T = {}>({
  action = "POST",
  endpoint,
  body,
}: UPLOADProps): Promise<APIResponse & T> => {
  try {
    const formData = new FormData();

    Object.entries(body ?? {}).forEach(([key, value]: [string, any]) => {
      if (value instanceof Blob) {
        formData.append(key, value);
      } else if (
        Array.isArray(value) &&
        value.every((item) => item instanceof Blob)
      ) {
        value.forEach((file) => {
          formData.append(key, file);
        });
      } else {
        formData.append(key, JSON.stringify(value));
      }
    });

    const response = await fetch(`${config?.host || ""}${endpoint}`, {
      method: action,
      credentials: "include",
      body: formData,
    });

    if (isSuccess(response.status)) {
      return await response.json();
    } else {
      throw { response };
    }
  } catch (caught: any) {
    const { response } = caught;

    if (endpoint !== "/api/user/login" && response?.status === 401) {
      window.location.href = `/?form=login`;
    }

    throw await await response.json();
  }
};

export default UPLOAD;
