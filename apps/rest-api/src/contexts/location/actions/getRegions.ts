import regions from "@db/static/regions.json";

export default ({ country }: { country: string }) => {
  return regions.regions.reduce((total, current) => {
    if (current.country === country) {
      return [...total, { name: current.name, id: current.id }];
    }

    return total;
  }, [] as { name: string }[]);
};
