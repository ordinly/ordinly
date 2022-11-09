import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";
import { Invitation } from "@db/restAPIConnection/schemas/Invitation";

import { getProjectCompanyPermissions } from "@contexts/projects/actions";

import type { APIResponse } from "@contexts/shared/types";

import type { CompanyPermissions } from "@db/restAPIConnection/schemas/Project";

type GetCompanyProjectProps = {
  userId: string;
  companyId: string;
  projectId: string;
};

export type ProjectType = {
  _id: string;
  name: string;
  owner: { companyId?: string };
  description?: string;
  startDate: Date;
  dueDate?: Date;
  status?: string;
  priority?: string;
  companies?: string[];
  permissions: CompanyPermissions;
};

export default async ({
  companyId,
  projectId,
}: GetCompanyProjectProps): APIResponse<{ project: ProjectType }> => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw { status: 404, error: "Company not found" };
    }

    const project = await Project.findOne({
      _id: projectId,
      $or: [
        { "owner.companyId": company._id },
        { "companies.companyId": company._id },
      ],
      deletedAt: { $exists: false },
    });

    if (!project) {
      throw { status: 404, error: "Project not found" };
    }

    const {
      permissions: companyPermissions,
    } = await getProjectCompanyPermissions({ project, companyId });

    if (!companyPermissions) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to view this project",
      };
    }

    const invitations =
      (await Invitation.find({
        "from.companyId": company._id,
        accepted: { $exists: false },
        revoked: { $exists: false },
      })) || [];

    return {
      status: 200,
      message: "Project found",
      project: {
        _id: projectId,
        owner: project.owner,
        permissions: companyPermissions,
        name: project.name,
        description: project.description
          ? JSON.parse(project.description)
          : undefined,
        startDate: project.startDate,
        dueDate: project.dueDate,
        priority: project.priority,
        status: project.status,
        companies: [
          ...(project.companies || []).map(({ companyId }) =>
            companyId.toString()
          ),
          ...invitations.reduce(
            (total, { to: { companyId } }) =>
              companyId ? [...total, companyId.toString()] : total,
            [] as string[]
          ),
        ],
      },
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error fetching this project",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
