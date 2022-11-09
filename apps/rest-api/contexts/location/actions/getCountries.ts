import countries from "@db/static/countries.json";

export default () => {
  return countries.countries
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (a.name < b.name) {
        return -1;
      } else {
        return 0;
      }
    })
    .map(({ iso, name }) => ({
      iso,
      name,
    }));
};
