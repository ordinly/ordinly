export default async ({ userId, companyId }: any): Promise<void> => {
  try {
    console.log(userId, companyId);
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error fetching this company",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
