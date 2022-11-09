export const rangeFormatter = ([min, max], type) => {
  if (min && !max) {
    return `# of ${type} >= ${min}`;
  }

  if (max && !min) {
    return `# of ${type} <= ${max}`;
  }

  if (min && max) {
    return `${min} <= # of ${type} <= ${max}`;
  }
};
