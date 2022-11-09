import { Project } from "@db/restAPIConnection/schemas/Project";
import { Invitation } from "@db/restAPIConnection/schemas/Invitation";

import type { APIResponse } from "@contexts/shared/types";

type GetProjectProps = {
  userId: string;
  projectId: string;
};

export type ProjectType = {
  _id: string;
  owner?: { companyId?: string; userId?: string };
  name: string;
  description?: string;
  startDate: Date;
  dueDate?: Date;
  status?: string;
  priority?: string;
  companies?: string[];
};

export default async ({
  userId,
  projectId,
}: GetProjectProps): APIResponse<{ project: ProjectType }> => {
  try {
    const project = await Project.findOne({
      _id: projectId,
      "owner.userId": userId,
      deletedAt: { $exists: false },
    });

    if (!project) {
      throw { status: 404, error: "Project not found" };
    }

    const invitations = await Invitation.find({
      "from.projectId": project._id,
      accepted: { $exists: false },
      revoked: { $exists: false },
    });

    return {
      status: 200,
      message: "Project found",
      project: {
        _id: projectId,
        owner: project.owner,
        name: project.name,
        description: project.description
          ? JSON.parse(project.description)
          : undefined,
        startDate: project.startDate,
        dueDate: project.dueDate,
        priority: project.priority,
        status: project.status,
        companies: [
          ...((project.companies || []).map(
            ({ companyId }) => companyId
          ) as string[]),
          ...(invitations || []).reduce(
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
