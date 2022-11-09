export const rangeValidator = (value, [min, max]) => {
  if (min && value.length < min) {
    return false;
  }

  if (max && value.length > max) {
    return false;
  }

  return true;
};
