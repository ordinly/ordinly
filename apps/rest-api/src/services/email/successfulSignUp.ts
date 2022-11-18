type SuccessfulSignUpProps = {
  verificationCode: string;
  referer: string;
};

export default ({ verificationCode, referer }: SuccessfulSignUpProps) => ({
  subject: "Welcome to Ordinly",
  html: `<p><a href="${referer}?verification=${verificationCode}">Click Here</a> to verify your email and start planning!</p>`,
});
