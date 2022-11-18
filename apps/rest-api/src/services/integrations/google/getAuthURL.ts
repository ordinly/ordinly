const scopes = ["https://www.googleapis.com/auth/gmail.modify"];

export default ({ oauth2Client }: { oauth2Client: any }) => {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
};
