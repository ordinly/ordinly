import type { Schema as SchemaType, Document, Model } from "mongoose";

export interface Permissions {
  settings: {
    invitations: { edit: boolean };
    profile: {
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
  clients: {
    clients: { add: boolean; edit: boolean; remove: boolean };
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
    companies: {
      add: boolean;
      edit: boolean;
      remove: boolean;
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
}

export interface CompanyType {
  owner: string;
  name: string;
  description?: string;
  public: boolean;
  profilePicture: { key: string; name: string };
  profile: {
    tagline?: string;
    description?: string;
    tags?: string[];
    location?: {
      country?: string;
      region?: string;
      city?: string;
      streetAddress?: string;
    };
  };
  phoneNumber: string;
  emailAddress: string;
  createdBy: SchemaType.Types.ObjectId;
  createdAt: Date;
  deletedBy?: SchemaType.Types.ObjectId;
  deletedAt?: Date;
  subscription?: {
    active: boolean;
    customerId: string;
    subscriptionId: string;
    scheduleId?: string;
  };
  projects?: { clientId?: any; projectId: any }[];
  address: {
    country: string;
    region: string;
    city: string;
    postalCode: string;
    streetAddress: string;
  };
  workers: {
    _id?: any;
    userId?: string;
    email?: string;
    roleId?: string;
    status: string;
    joined: Date;
    inactiveAt?: Date;
  }[];
  roles: {
    _id?: SchemaType.Types.ObjectId;
    name: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    deletedBy?: SchemaType.Types.ObjectId;
    deletedAt?: Date;
    permissions: Permissions;
  }[];
  clients: {
    _id?: any;
    userId?: SchemaType.Types.ObjectId;
    companyId?: SchemaType.Types.ObjectId;
    name?: string;
    description?: string;
    priority?: string;
    status?: string;
    createdAt: Date;
    createdBy: String;
    deletedAt?: Date;
    deletedBy?: String;
    contacts: {
      _id?: any;
      name: string;
      description?: string;
      email?: string;
      phoneNumber?: number;
      notes?: {
        _id?: SchemaType.Types.ObjectId;
        userId: string;
        text: string;
        createdDate: Date;
        updatedDate?: Date;
        deletedDate?: Date;
      }[];
      files?: string[];
    }[];
    address?: {
      country?: string;
      region?: string;
      city?: string;
      streetAddress?: string;
      postalCode?: string;
    };
  }[];
  teams: {
    _id?: SchemaType.Types.ObjectId;
    name: string;
    description?: string;
    createdBy: string;
    createdAt: Date;
    deletedBy?: string;
    deletedAt?: Date;
    members: string[];
  }[];
  careers: {
    title: string;
    description: string;
    payRange: { from: number; to: number };
  }[];
  posts: { title: string; text: string; attachments: [] }[];
  priceBook: {
    name: string;
    description: string;
    price: { from: number; to: string };
  }[];
  tags: string[];
}

//@ts-ignore
export interface CompanyDocument extends Document, CompanyType {}

//@ts-ignore
export interface CompanyModel extends Model<CompanyDocument> {}
