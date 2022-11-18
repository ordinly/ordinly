import maximumPermissions from "@db/static/maximumCompanyProjectPermissions.json";

import type {
  ProjectDocument,
  CompanyPermissions,
} from "@db/restAPIConnection/schemas/Project";

type GetCompanyPermissionsProps = {
  project: ProjectDocument;
  companyId: string;
};

export default ({
  companyId,
  project,
}: GetCompanyPermissionsProps): { permissions: CompanyPermissions } => {
  try {
    if (project) {
      let permissions: CompanyPermissions | undefined;

      if (project.owner.companyId?.toString() === companyId.toString()) {
        permissions = maximumPermissions;
      } else {
        const projectCompany = project.companies.find(
          ({ companyId: current }) =>
            companyId.toString() === current.toString()
        );

        if (!projectCompany) {
          throw {};
        }

        permissions = projectCompany?.permissions;
      }

      if (permissions) {
        return {
          permissions,
        };
      }
    }

    throw {};
  } catch (caught: any) {
    console.log(caught);
    const {
      error = "There was an error fetching this company's project permissions",
    } = caught;

    throw {
      error: error,
    };
  }
};
