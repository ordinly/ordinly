declare type User = {
    _id: string;
    name: string;
};
export declare type ProjectTeam = {
    _id: string;
    name: string;
    description?: string;
    members?: string[];
};
declare type Client = {
    _id: string;
    owner: User;
    name: string;
    description?: string;
    workers: string[];
    teams: string[];
    accepted: boolean;
};
export declare type Task = {
    _id: string;
    name: string;
    description?: string;
    createdDate: Date | string;
    dueDate?: Date | string;
    startDate?: Date;
    completedDate?: Date;
};
export declare type ProjectCompany = {
    _id: string;
    companyId: string;
    name: string;
    assignedWorkers?: User[];
    assignedTeams?: ProjectTeam[];
};
export declare type Project = {
    _id: string;
    owner: Client;
    name: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    deletedBy?: string;
    deletedAt?: Date;
    assignedWorkers?: User[];
    assignedTeams?: ProjectTeam[];
    assignedCompanies?: ProjectCompany[];
    tasks: Task[];
    documents: any;
    priority?: string;
    status?: string;
    startDate: Date;
    dueDate?: Date;
};
export declare const getProject: ({ companyId, projectId, clientId, }: {
    companyId: string;
    projectId: string;
    clientId: string;
}) => Promise<any>;
export {};
