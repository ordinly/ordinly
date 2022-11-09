import { google } from "googleapis";

const NODE_ENV: string = process.env["NODE_ENV"] || "";
const GOOGLE_CLIENT_ID: string = process.env["GOOGLE_CLIENT_ID"] || "";
const GOOGLE_CLIENT_SECRET: string = process.env["GOOGLE_CLIENT_SECRET"] || "";
const REDIRECT_URL: string = `https://ordinly${
  NODE_ENV === "production" ? "" : ".test"
}.com/redirect`;

export default () => {
  const oAuth2 = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URL
  );

  return oAuth2;
};
