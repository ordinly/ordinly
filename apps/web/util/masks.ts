export const phoneMask = (value) => {
  const sections = value
    ?.replace(/\D/g, "")
    .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

  if (sections) {
    return `${sections[1] ? ` (${sections[1]})` : ""}${
      sections[2] ? ` ${sections[2]}` : ""
    }${sections[3] ? `-${sections[3]}` : ""}`;
  }
};

export const phoneUnmask = (value) => {
  return value.replace(/\D/g, "").substring(0, 10);
};
