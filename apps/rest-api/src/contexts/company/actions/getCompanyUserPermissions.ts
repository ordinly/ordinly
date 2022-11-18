import maximumPermissions from "@db/static/maximumPermissions.json";
import minimumPermissions from "@db/static/minimumPermissions.json";

import type {
  CompanyType,
  Permissions,
} from "@db/restAPIConnection/schemas/Company";

type GetCompanyPermissionsProps = {
  company: CompanyType;
  userId: string;
};

export default ({
  userId,
  company,
}: GetCompanyPermissionsProps): { permissions: Permissions } => {
  try {
    if (company) {
      let permissions: Permissions | undefined;

      if (company.owner.toString() === userId.toString()) {
        permissions = maximumPermissions;
      } else {
        const worker = company.workers.find(
          ({ userId: workerId }) => workerId?.toString() === userId.toString()
        );

        if (!worker) {
          throw {};
        }

        if (!worker?.roleId) {
          permissions = minimumPermissions;
        } else {
          permissions = company.roles.find(
            ({ _id }) => _id?.toString() === worker?.roleId
          )?.permissions;
        }
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
      error = "There was an error fetching this user's company permissions",
    } = caught;

    throw {
      error: error,
    };
  }
};
