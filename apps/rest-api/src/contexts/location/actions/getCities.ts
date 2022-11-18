import regions from "@db/static/regions.json";

import cities from "@db/static/cities.json";

export default ({ country, region }: { country: string; region: string }) => {
  const selectedRegion = regions.regions.find(
    (current) => current.country === country && current.name === region
  );

  return cities.cities.reduce((total, current) => {
    if (current.country === country && current.region === selectedRegion?.id) {
      return [...total, { name: current.name }];
    }

    return total;
  }, [] as { name: string }[]);
};
