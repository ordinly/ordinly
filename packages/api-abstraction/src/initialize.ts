export const config = {
  host: "",
};

export const initialize = ({ host }: { host: string }) => {
  config.host = host;
};
