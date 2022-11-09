export type GetCompanyProps = {
  userId: string;
  companyId: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  phone?: number;
  roleId?: string;
  status: string;
  joined?: Date;
};

export type ProjectType = {
  _id: string;
  name: string;
  description?: string;
};

export type Permissions = {
  settings: {
    invitations: { edit: boolean };
    profile: {
      details: {
        edit: boolean;
      };
      posts: {
        add: boolean;
        edit: boolean;
        remove: boolean;
      };
      priceBook: {
        add: boolean;
        edit: boolean;
        remove: boolean;
      };
      jobPostings: {
        add: boolean;
        edit: boolean;
        remove: boolean;
      };
    };
  };
  clients: {
    add: boolean;
    edit: boolean;
    remove: boolean;
    contacts: {
      add: boolean;
      edit: boolean;
      remove: boolean;
    };
  };
  projects: {
    projects: {
      add: boolean;
      assigned: { edit: boolean; remove: boolean };
      nonAssigned: { view: boolean; edit: boolean; remove: boolean };
    };
    tasks: {
      add: boolean;
      assigned: { edit: boolean; remove: boolean };
      nonAssigned: { view: boolean; edit: boolean; remove: boolean };
    };
  };
  people: {
    workers: { add: boolean; edit: boolean; remove: boolean };
    teams: {
      add: boolean;
      assigned: { edit: boolean };
      nonAssigned: { edit: boolean };
      remove: boolean;
    };
    roles: { add: boolean; edit: boolean; remove: boolean };
  };
};

export type Role = {
  _id?: string;
  name: string;
  description?: string;
  permissions?: any;
};

export type Team = {
  _id?: string;
  name: string;
  description?: string;
  members: string[];
};

export type InvitationType = {
  _id: string;
  to: {
    email?: string;
    companyId?: string;
  };
  from: {
    user: UserType;
  };
};

export type CompanyType = {
  _id: string;
  owner: UserType;
  name: string;
  description?: string;
  public: boolean;
  workers?: { _id?: string; userId?: string }[];
  invitations: any;
  roles?: any[];
  teams?: string[];
  emailAddress?: string;
  phoneNumber?: string;
  subscription?: any;
  clients?: string[];
  address?: any;
  tags: any;
  projects?: string[];
  permissions: any;
  workerId?: string;
};

export type ClientType = {
  _id?: string;
  name: string;
  description?: string;
  pending: boolean;
};
