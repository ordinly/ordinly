import { isSuccess } from "./";

import type { APIResponse } from "./";

import { config } from "../initialize";

type GETProps = {
  endpoint: string;
  type?: string;
  queryParams?: {
    [key: string | number]: string | number | string[] | number[];
  };
};

const GET = async <T = {}>({
  endpoint,
  type = "application/json",
  queryParams = {},
}: GETProps): Promise<(APIResponse & T) | any> => {
  try {
    const queryParamString = (Object.entries(queryParams) as [
      string,
      string
    ][]).reduce(
      (total: string, [key, value]: [string, string], index: number): string =>
        `${total}${index ? "&" : ""}${key}=${
          Array.isArray(value) ? value.join(",") : value
        }`,
      "?" as string
    );

    const response = await fetch(
      `${config?.host || ""}${endpoint}${
        queryParamString !== "?" ? queryParamString : ""
      }`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": type,
        },
      }
    );

    if (isSuccess(response.status)) {
      if (type === "application/json") {
        return await response?.json();
      } else if (type === "image/*") {
        const reader = response?.body?.getReader();

        const blob = await new Response(
          new ReadableStream({
            start(controller) {
              return pump();
              function pump(): any {
                return reader?.read().then(({ done, value }) => {
                  // When no more data needs to be consumed, close the stream
                  if (done) {
                    controller.close();
                    return;
                  }
                  // Enqueue the next data chunk into our target stream
                  controller.enqueue(value);
                  return pump();
                });
              }
            },
          })
        ).blob();

        return blob;
      }
    } else {
      throw { response };
    }
  } catch (caught: any) {
    const { response } = caught;

    if (response?.status === 401) {
      window.location.href = `/?form=login`;
    }

    const { error } = await response?.json();

    throw { status: response.status, error };
  }
};

export default GET;
