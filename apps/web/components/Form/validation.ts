export const required = (value: string | Array<any>) => {
  if (Array.isArray(value) && !value.length) {
    return "Required";
  } else if (!value) {
    return "Required";
  }
};

export const isEmail = (value: string) => {
  return [undefined, null].includes(value) ||
    (typeof value === "string" &&
      value?.match(
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
      ))
    ? undefined
    : "Enter a valid email address";
};

export const isPassword = (value: string) => {
  const errors = [];

  value.length < 8 && errors.push("a minimum 8 characters");

  !value.match(/^(?=[^A-Z]*[A-Z])[ -~]*$/) &&
    errors.push("one uppercase letter");

  !value.match(/^(?=[^a-z]*[a-z])[ -~]*$/) &&
    errors.push("one lowercase letter");

  !value.match(/.*[0-9].*/) && errors.push("one number");

  return errors.length
    ? errors.reduce(
        (total, current) => `${total}, ${current}`,
        "A valid password must contain "
      )
    : undefined;
};

export const isNumber = (value) =>
  value?.match(/^\d+$/) ? undefined : "Must contain only digits";

export const isPhoneNumber = (value) =>
  [undefined, null].includes(value)
    ? undefined
    : isNumber(value) ||
      (value?.length !== 10 ? "Must be a 10 digit phone number" : undefined);

const countryPostalCodeMapping = {
  CA: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
};

export const isPostalCode = (value, country) =>
  [undefined, null].includes(value) ||
  value?.match(countryPostalCodeMapping[country])
    ? undefined
    : "Must be a valid code";

export const isEndDateLessThanStartDate = (value, allValues) =>
  new Date(value) < new Date(allValues.startDate)
    ? "Must be after the start date"
    : undefined;
