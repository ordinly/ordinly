export type WorkCompany = {
    _id: string;
    owner: string;
    name: string;
    description?: string;
    profilePicture: {
        key: string;
        name: string;
    };
    public: boolean;
    workers: {
        email: string;
        name: string;
        joined: Date;
        status: string;
        _id: string;
    }[];
    teams: {
        createdAt: Date;
        createdBy: Date;
        description: string;
        members: string[];
        name: string;
        _id: string;
    }[];
    clients: {
        name: string;
    }[];
    active: boolean;
};
export type GetCompaniesResponse = {
    companies: WorkCompany[];
};
export declare const getCompanies: () => Promise<any>;
