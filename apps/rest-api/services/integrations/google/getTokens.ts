// This will provide an object with the access_token and refresh_token.
// Save these somewhere safe so they can be used at a later time.
export default async ({
  oauth2Client,
  code,
}: {
  oauth2Client: any;
  code: string;
}) => {
  const { tokens } = await oauth2Client.getToken(code);

  oauth2Client.setCredentials(tokens);

  return tokens;
};
