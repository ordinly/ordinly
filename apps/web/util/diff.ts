import { transform, isEqual, isArray, isObject } from "lodash";

const getChanges = (original, comparison, shallow = false) => {
  const diff = transform(comparison, (result, value, key) => {
    if (
      !original ||
      (!original[key] &&
        original[key] !== 0 &&
        original[key] !== "" &&
        original[key] !== false)
    ) {
      result[key] = value;
    } else if (!isEqual(value, original[key])) {
      result[key] = shallow
        ? value
        : !isArray(value) && isObject(value) && isObject(original[key])
        ? getChanges(original[key], value)
        : value;
    }
  });

  return Object.entries(diff).length ? diff : undefined;
};

export default getChanges;
