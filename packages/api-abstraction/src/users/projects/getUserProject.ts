import { GET } from "../../requests";

type User = {
  _id: string;
  name: string;
};

export type UserProjectTeam = {
  _id: string;
  name: string;
  description?: string;
  members?: string[];
};

type Client = {
  _id: string;
  owner: User;
  name: string;
  description?: string;
  workers: string[];
  teams: string[];
  accepted: boolean;
};

export type UserTask = {
  _id: string;
  name: string;
  description?: string;
  subtasks: any[];
  createdDate: Date | string;
  dueDate?: Date | string;
  startDate?: Date;
  completedDate?: Date;
};

export type UserProjectCompany = {
  _id: string;
  companyId: string;
  name: string;
  assignedWorkers?: User[];
  assignedTeams?: UserProjectTeam[];
};

export type UserProject = {
  _id: string;
  owner: Client;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  deletedBy?: string;
  deletedAt?: Date;
  assignedWorkers?: User[];
  assignedTeams?: UserProjectTeam[];
  assignedCompanies?: UserProjectCompany[];
  tasks: UserTask[];
  documents: any;
  priority?: string;
  status?: string;
  startDate: Date;
  dueDate?: Date;
};

export const getUserProject = async ({ projectId }: { projectId: string }) => {
  try {
    const response = await GET<{ project: UserProject }>({
      endpoint: `/api/user/projects/${projectId}`,
    });

    if ("error" in response) {
      throw response;
    } else {
      return response;
    }
  } catch (caught: any) {
    const {
      status = 500,
      error = "There was an error fetching this project",
    } = caught;

    return { status, error };
  }
};
