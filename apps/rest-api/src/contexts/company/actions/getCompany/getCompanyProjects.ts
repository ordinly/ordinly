import { Project } from "@db/restAPIConnection/schemas/Project";

import type { CompanyDocument } from "@db/restAPIConnection/schemas/Company";

export default async ({
  company,
}: {
  company: CompanyDocument;
}): Promise<any> => {
  const companyProjects = await Project.find(
    {
      $and: [
        {
          $or: [
            { "owner.companyId": company._id },
            {
              "companies.companyId": company._id.toString(),
            },
          ],
        },
        { deletedAt: { $exists: false } },
      ],
    },
    { _id: 1, name: 1, description: 1 }
  );

  return companyProjects;
};
