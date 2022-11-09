import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";
import { Invitation } from "@db/restAPIConnection/schemas/Invitation";

import { getProjectCompanyPermissions } from "@contexts/projects/actions";
import { getCompanyUserPermissions } from "@contexts/company/actions";

import type { APIResponse } from "@contexts/shared/types";

type GetCompanyProjectCompanyProps = {
  userId: string;
  companyId: string;
  projectId: string;
  invitedCompanyId: string;
};

export default async ({
  companyId,
  projectId,
  invitedCompanyId,
  userId,
}: GetCompanyProjectCompanyProps): APIResponse<{ company: any }> => {
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

    const { permissions: userPermissions } = await getCompanyUserPermissions({
      company,
      userId,
    });

    const projectCompanyEntry = project.companies.find(
      ({ companyId: current }) =>
        current?.toString() === invitedCompanyId?.toString()
    );

    const projectCompany = await Company.findOne({ _id: invitedCompanyId });

    if (!projectCompany || !projectCompanyEntry) {
      throw { status: 404, error: "Project company not found" };
    }

    const invitation = await await Invitation.findOne({
      "from.projectId": project._id,
      accepted: { $exists: false },
      revoked: { $exists: false },
    });

    return {
      status: 200,
      message: "Project company found",
      company: {
        _id: projectCompanyEntry?._id,
        companyId: projectCompanyEntry?.companyId,
        permissions:
          invitation?.from?.permissions || projectCompanyEntry?.permissions,
        name: projectCompany?.name,
        addedOn: projectCompanyEntry?.addedOn,
        createdAt: invitation?.createdAt,
        pending: invitation ? true : false,
        invitationId: invitation?._id,
        canEdit:
          companyPermissions?.companies?.edit &&
          userPermissions?.projects?.companies?.edit,
        canRemove:
          companyPermissions?.companies?.remove &&
          userPermissions?.projects?.companies?.remove,
      },
    };
  } catch (caught: any) {
    console.error(caught);
    const {
      status = 500,
      error = "There was an error fetching this project company",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
