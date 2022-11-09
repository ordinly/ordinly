import { Company } from "@db/restAPIConnection/schemas/Company";

import getCompanyWorkers from "@contexts/company/actions/getCompany/getCompanyWorkers";

import type { APIResponse } from "@contexts/shared/types";

type GetCompanyProps = {
  userId: string;
};

type GetCompaniesResponse = {
  companies: {
    _id: string;
    owner: string;
    name: string;
    description?: string;
    public: boolean;
    numberOfWorkers: number;
    numberOfTeams: number;
    profilePicture: string;
  }[];
};

export default async ({
  userId,
}: GetCompanyProps): APIResponse<GetCompaniesResponse> => {
  try {
    const companies = await Company.find({
      $and: [
        {
          workers: {
            $elemMatch: {
              userId: userId.toString(),
              status: { $nin: ["pending", "inactive"] },
            },
          },
        },
        { deletedAt: { $exists: false } },
      ],
    });

    if (!companies) {
      throw { status: 404, error: "Companies not found" };
    }

    const formattedCompanies = await companies.reduce(
      async (total, company) => {
        const {
          _id,
          owner,
          name,
          description,
          teams,
          profilePicture,
          subscription,
          clients,
        } = company;

        const workers = await getCompanyWorkers({ company });

        if (workers) {
          return total.then((newCompanies) => [
            ...newCompanies,
            {
              _id,
              owner,
              name,
              description,
              teams,
              workers,
              profilePicture: profilePicture?.key ? profilePicture : undefined,
              clients,
              active: subscription?.active || false,
            },
          ]);
        }

        return total;
      },
      Promise.resolve([] as any[])
    );

    return {
      status: 200,
      message: "Companies fetched",
      companies: formattedCompanies,
    };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error fetching your companies",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
