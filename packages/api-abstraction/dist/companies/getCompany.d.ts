type User = {
    _id: string;
    name: string;
    email: string;
    phone?: number;
    role?: Role;
    status: string;
    joined: Date;
};
export type Permissions = {
    details: {
        add: boolean;
        view: boolean;
        remove: boolean;
        edit: boolean;
    };
    contacts: {
        add: boolean;
        view: boolean;
        remove: boolean;
        edit: boolean;
    };
    roles: {
        add: boolean;
        view: boolean;
        edit: boolean;
        remove: boolean;
    };
    clients: {
        add: boolean;
        view: boolean;
        remove: boolean;
        edit: boolean;
    };
    teams: {
        add: boolean;
        view: boolean;
        edit: boolean;
        remove: boolean;
    };
    workers: {
        add: boolean;
        view: boolean;
        edit: boolean;
        remove: boolean;
    };
    projects: {
        add: boolean;
        assignedProjects: {
            view: boolean;
            edit: boolean;
            remove: boolean;
        };
        nonAssignedProjects: {
            view: boolean;
            edit: boolean;
            remove: boolean;
        };
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
export type Role = {
    _id: string;
    name: string;
    description?: string;
    permissions: Permissions;
};
export type Team = {
    _id: string;
    name: string;
    description?: string;
    members?: string[];
};
export type ContactType = {
    _id: string;
    email: string;
    phoneNumber: string;
    name: string;
};
export type Client = {
    _id: string;
    name: string;
    description?: string;
    contacts: ContactType[];
    address?: {
        country?: string;
        region?: string;
        city?: string;
        postalCode?: string;
        streetAddress?: string;
    };
    projects: CompanyProject[];
};
type Invitation = {
    _id: string;
    to: {
        email: string;
        roleId: string;
    };
    from: {
        user: User;
    };
};
export type CompanyProject = {
    _id: string;
    owner: string;
    name: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    deletedBy?: string;
    deletedAt?: Date;
    workers?: string[];
    teams?: string[];
};
type ClientInvitation = {
    _id: string;
    from: {
        company: {
            name: string;
            description: string;
            _id: string;
        };
        user: {
            email: string;
            name: string;
            _id: string;
        };
    };
    to: {
        companyId: string;
    };
};
export type Company = {
    _id: string;
    owner: string;
    name: string;
    description?: string;
    public: boolean;
    createdBy: User;
    workers: User[];
    roles: Role[];
    teams: Team[];
    outgoingInvitations: Invitation[];
    invitations: Invitation[];
    emailAddress: string;
    phoneNumber: string;
    profilePicture: {
        key: string;
        name: string;
    };
    subscription: {
        active: boolean;
    };
    clients: Client[];
    clientInvitations: ClientInvitation[];
};
export declare const getCompany: ({ companyId }: {
    companyId: string;
}) => Promise<any>;
export {};
