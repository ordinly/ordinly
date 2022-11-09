import { Project } from "@db/restAPIConnection/schemas/Project";

import { inviteCompaniesToPersonalProject } from "@contexts/user/actions";

import type { UserDocument } from "@db/restAPIConnection/schemas/User";

import type { APIResponse } from "@contexts/shared/types";

type CreateProjectProps = {
  name: string;
  description: string;
  user: UserDocument;
  status: string;
  priority: string;
  startDate: Date;
  dueDate: Date;
  invitations: {
    companyId: string;
    permissions: {
      companies: {
        add: boolean;
        edit: boolean;
        remove: boolean;
        view: boolean;
      };
      tasks: {
        add: boolean;
        assigned: {
          edit: boolean;
          remove: boolean;
        };
        nonAssigned: {
          view: boolean;
          edit: boolean;
          remove: boolean;
        };
      };
    };
  }[];
};

export default async ({
  name,
  description,
  status,
  priority,
  startDate,
  dueDate,
  user,
  invitations,
}: CreateProjectProps): APIResponse => {
  try {
    const project = await Project.create({
      name,
      description: JSON.stringify(description),
      status,
      priority,
      startDate,
      dueDate,
      owner: { userId: user._id },
      companies: [],
      createdBy: user._id,
    });

    if (invitations?.length) {
      inviteCompaniesToPersonalProject({
        projectId: project._id,
        invitations,
        user,
      });
    }

    user.projects.push(project._id);

    await user.save();

    return { status: 201, message: "Project created" };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error creating this project",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
