import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { User } from "@db/restAPIConnection/schemas/User";
import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";

import type { CompanyDocument } from "@db/restAPIConnection/schemas/Company";
import type { ProjectDocument } from "@db/restAPIConnection/schemas/Project";

export default async ({ company }: { company: CompanyDocument }) => {
  return (
    await Invitation.find({
      "to.companyId": company._id,
      revoked: { $exists: false },
      accepted: { $exists: false },
    })
  ).reduce(async (total, current) => {
    const {
      _id,
      from: { userId, projectId, companyId },
    } = current;

    const user = await User.findOne({ _id: userId });

    let project: ProjectDocument | null;
    if (projectId) {
      project = await Project.findOne({ _id: projectId });
    }

    let fromCompany: CompanyDocument | null;
    if (companyId) {
      fromCompany = await Company.findOne({ _id: companyId });
    }

    return total.then((newTotal) => [
      ...newTotal,
      {
        _id,
        to: { company: company.name },
        from: {
          user,
          company: fromCompany,
          project,
        },
      },
    ]);
  }, Promise.resolve([] as any));
};
