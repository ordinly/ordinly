export const isSuccess = (status: number) => /^(2).*$/.test(status.toString());

export { default as GET } from "./GET";
export { default as POST } from "./POST";
export { default as PUT } from "./PUT";
export { default as DELETE } from "./DELETE";
export { default as UPLOAD } from "./UPLOAD";

export * from "./types";
