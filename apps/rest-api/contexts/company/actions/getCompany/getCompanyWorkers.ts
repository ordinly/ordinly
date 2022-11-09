import { User } from "@db/restAPIConnection/schemas/User";

import type { CompanyDocument } from "@db/restAPIConnection/schemas/Company";

import type { Role, UserType } from "./types";

export default async ({
  company,
  roles,
}: {
  company: CompanyDocument;
  roles?: Role[];
}): Promise<UserType[]> => {
  return await company.workers.reduce(
    async (total, { userId, roleId, status, joined }) => {
      const worker = await User.findOne(
        { _id: userId },
        { name: 1, email: 1, phone: 1 }
      );

      if (worker) {
        const { _id, name, email, phone } = worker;

        const role = roles?.find(
          ({ _id: currentId }) => currentId?.toString() === roleId?.toString()
        );

        return total.then((newWorkers) => [
          ...newWorkers,
          {
            _id: _id.toString(),
            name,
            email,
            phone,
            role,
            status: status.toString(),
            joined,
            userId,
          },
        ]);
      }

      return total;
    },
    Promise.resolve([] as UserType[])
  );
};
