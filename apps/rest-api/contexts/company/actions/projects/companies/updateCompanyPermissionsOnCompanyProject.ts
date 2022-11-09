import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";

import { getProjectCompanyPermissions } from "@contexts/projects/actions";

import type { APIResponse } from "@contexts/shared/types";

type UpdateCompanyPermissionsOnPersonalProjectProps = {
  companyId: string;
  projectId: string;
  permissions: any;
  invitedCompanyId: string;
};

export default async ({
  companyId,
  projectId,
  permissions,
  invitedCompanyId,
}: UpdateCompanyPermissionsOnPersonalProjectProps): APIResponse => {
  try {
    const project = await Project.findOne({ _id: projectId });

    if (!project) {
      throw {
        status: 404,
        error: "Project not found",
      };
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

    if (!companyPermissions.companies.edit) {
      throw {
        status: 403,
        error: "You don't have the necessary permissions to view this project",
      };
    }

    const company = await Company.findOne({ _id: invitedCompanyId });

    if (!company) {
      throw {
        status: 404,
        error: "Company not found",
      };
    }

    const projectCompany = project.companies.find(
      ({ companyId: current }) => current.toString() === companyId
    );

    if (!projectCompany) {
      throw {
        status: 404,
        error: "Company not found on project",
      };
    }

    projectCompany.permissions = permissions;

    await project.save();

    return { status: 200, message: "Invitation updated" };
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error updating this invitation",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
