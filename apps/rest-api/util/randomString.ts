const urlSafeCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-._~".split(
  ""
);

type RandomStringProps = {
  length: number;
};

export default ({ length }: RandomStringProps) => {
  let returnValue = "";

  for (let i = 0; i < length; i++) {
    returnValue = `${returnValue}${
      urlSafeCharacters[Math.floor(Math.random() * urlSafeCharacters.length)]
    }`;
  }

  return returnValue;
};
