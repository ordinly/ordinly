import type { Schema } from "mongoose";

export interface Invitation {
  to: {
    email?: string;
    userId?: Schema.Types.ObjectId;
    companyId?: Schema.Types.ObjectId;
    roleId?: Schema.Types.ObjectId;
  };
  from: {
    userId: Schema.Types.ObjectId;
    companyId: Schema.Types.ObjectId;
    teamId?: Schema.Types.ObjectId;
    projectId?: Schema.Types.ObjectId;
    permissions?: {
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
  };
  accepted: boolean;
  revoked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
