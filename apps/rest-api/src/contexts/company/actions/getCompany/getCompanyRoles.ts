import type {
  CompanyDocument,
  Permissions,
} from "@db/restAPIConnection/schemas/Company";

import type { Role } from "./types";

export default ({
  company,
}: {
  company: CompanyDocument;
  permissions?: Permissions;
}): Role[] => {
  return company.roles.map(({ _id: roleId, name, description }) => ({
    _id: roleId?.toString(),
    name,
    description,
  }));
};
