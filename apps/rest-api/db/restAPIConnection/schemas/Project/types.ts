export type ProjectPermissions = {
  details: {
    view: boolean;
    edit: boolean;
    remove: boolean;
  };
  tasks: {
    add: boolean;
    assignedTasks: {
      view: boolean;
      edit: boolean;
      remove: boolean;
    };
    nonAssignedTasks: {
      view: boolean;
      edit: boolean;
      remove: boolean;
    };
  };
};

export type CompanyPermissions = {
  companies: {
    add: boolean;
    edit: boolean;
    remove: boolean;
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

export interface ProjectType {
  name: string;
  description?: string;
  createdBy: string;
  createdAt: Date;
  deletedBy?: string;
  deletedAt?: Date;
  tasks: string[];
  accepted: boolean;
  owner: { userId?: string; companyId?: string };
  assignees: {
    companyId?: string;
    userIds?: string[];
    teamIds?: string[];
    assignedOn: Date;
    assignedBy: string;
  }[];
  companies: {
    _id?: String;
    companyId: string;
    permissions: CompanyPermissions;
    assignedWorkers: string[];
    assignedTeams: string[];
    addedOn: Date;
    addedBy?: string;
  }[];
  status?: string;
  priority?: string;
  client?: string;
  startDate: Date;
  dueDate?: Date;
}
