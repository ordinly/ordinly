type User = {
    _id: string;
    name: string;
};
export type CompanyProjectTeam = {
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
export type CompanyProjectTask = {
    _id: string;
    name: string;
    description?: string;
    subtasks: any[];
    createdDate: Date | string;
    dueDate?: Date | string;
    startDate?: Date;
    completedDate?: Date;
};
export type CompanyProjectCompany = {
    _id: string;
    companyId: string;
    name: string;
    assignedWorkers?: User[];
    assignedTeams?: CompanyProjectTeam[];
};
export type FetchedCompanyProject = {
    _id: string;
    owner: Client;
    name: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    deletedBy?: string;
    deletedAt?: Date;
    assignedWorkers?: User[];
    assignedTeams?: CompanyProjectTeam[];
    assignedCompanies?: CompanyProjectCompany[];
    tasks: CompanyProjectTask[];
    documents: any;
    priority?: string;
    status?: string;
    startDate: Date;
    dueDate?: Date;
};
export declare const getCompanyProject: ({ projectId, companyId, }: {
    projectId: string;
    companyId: string;
}) => Promise<any>;
export {};
