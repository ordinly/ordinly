import { User } from "@db/restAPIConnection/schemas/User";
import { Invitation } from "@db/restAPIConnection/schemas/Invitation";
import { Company } from "@db/restAPIConnection/schemas/Company";

import type { UserDocument } from "@db/restAPIConnection/schemas/User";

type UserType = {
  _id: string;
  name: string;
};

type CompanyType = {
  _id: string;
  name: string;
};

type RoleType = {
  _id?: string;
  name: string;
};

type InvitationType = {
  _id: string;
  to: {
    email: string;
    role?: RoleType;
  };
  from: {
    user: UserType;
    company: CompanyType;
  };
};

type GetUserReturn =
  | ({ user: UserDocument } & { invitations: InvitationType[] })
  | undefined;

const getInvitations = async ({ email }: UserDocument) => {
  let invitations: InvitationType[] = [];

  const invitationDocs = await Invitation.find({
    "to.email": email,
    revoked: { $exists: false },
    accepted: { $exists: false },
  });

  if (invitationDocs?.length) {
    invitations = await invitationDocs.reduce(
      async (
        total,
        {
          _id,
          from: { userId: fromUserId, companyId: fromCompanyId },
          to: { email: toEmail, roleId },
        }
      ) => {
        const fromUser = await User.findOne({ _id: fromUserId });

        const fromCompany = await Company.findOne({ _id: fromCompanyId });

        if (fromUser && fromCompany) {
          const { name } = fromUser;
          const { name: companyName } = fromCompany;

          const role = fromCompany.roles.find(
            ({ _id }) => roleId?.toString() === _id?.toString()
          );

          return total.then((newInvitations) => [
            ...newInvitations,
            {
              _id: _id.toString(),
              from: {
                user: {
                  _id: fromUserId.toString(),
                  name,
                },
                company: {
                  _id,
                  name: companyName,
                },
              },
              to: {
                email: toEmail as string,
                role: role
                  ? { _id: role?._id?.toString(), name: role.name }
                  : undefined,
              },
            },
          ]);
        }

        return total;
      },
      Promise.resolve([] as InvitationType[])
    );
  }

  return invitations;
};

type GetUserByEmailProps = {
  email: string;
};

export const getUserByEmail = async ({
  email,
}: GetUserByEmailProps): Promise<GetUserReturn> => {
  try {
    const user = await User.findOne({
      email: email.replace(" ", "").toLowerCase(),
    });

    console.log(user);

    if (user) {
      return { user, invitations: await getInvitations(user) };
    } else {
      throw { status: 404, error: "A user with that email was not found" };
    }
  } catch (caught: any) {}
};

type GetUserByVerificationCodeProps = {
  verificationCode: string;
};

export const getUserByVerificationCode = async ({
  verificationCode,
}: GetUserByVerificationCodeProps): Promise<GetUserReturn> => {
  try {
    console.log(verificationCode);
    const user = await User.findOne({ verificationCode });

    if (user) {
      return { user, invitations: await getInvitations(user) };
    } else {
      throw {
        status: 404,
        error: "A user with that verification code was not found",
      };
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching this user",
    } = caught;
    throw { status, error };
  }
};

type GetUserByIdProps = {
  id: string;
};

export const getUserById = async ({
  id,
}: GetUserByIdProps): Promise<GetUserReturn> => {
  try {
    const user = await User.findOne({ _id: id });

    if (user) {
      return { user, invitations: await getInvitations(user) };
    } else {
      throw { status: 404, error: "A user with that id was not found" };
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching this user",
    } = caught;
    throw { status, error };
  }
};
