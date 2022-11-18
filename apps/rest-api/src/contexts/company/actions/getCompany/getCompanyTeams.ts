import type {
  CompanyDocument,
  Permissions,
} from "@db/restAPIConnection/schemas/Company";

import type { Team } from "./types";

export default ({
  company,
}: {
  userId?: string;
  company: CompanyDocument;
  permissions?: Permissions;
}): Team[] => {
  return company.teams.reduce(
    (total, { _id: teamId, name, description, members }) => {
      return [
        ...total,
        {
          _id: teamId?.toString(),
          name,
          description,
          members: members.map((member) => member.toString()),
        },
      ];
    },
    [] as Team[]
  );
};
