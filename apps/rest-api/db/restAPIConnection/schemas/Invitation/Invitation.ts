import mongoose from "mongoose";

import restAPIConnection from "@db/restAPIConnection";

import type { Document, Model } from "mongoose";

import type { Invitation } from "./types";

const { Schema } = mongoose;

interface InvitationDocument extends Document, Invitation {}

interface InvitationModel extends Model<InvitationDocument> {}

const invitationSchema = new Schema<InvitationDocument>(
  {
    kind: String,
    to: {
      email: String,
      userId: Schema.Types.ObjectId,
      companyId: Schema.Types.ObjectId,
      roleId: Schema.Types.ObjectId,
    },
    from: {
      userId: { type: Schema.Types.ObjectId, required: true },
      companyId: Schema.Types.ObjectId,
      teamId: Schema.Types.ObjectId,
      projectId: Schema.Types.ObjectId,
      permissions: {
        companies: {
          add: Boolean,
          edit: Boolean,
          remove: Boolean,
        },
        tasks: {
          add: Boolean,
          assigned: {
            edit: Boolean,
            remove: Boolean,
          },
          nonAssigned: {
            view: Boolean,
            edit: Boolean,
            remove: Boolean,
          },
        },
      },
    },
    accepted: Boolean,
    revoked: Boolean,
  },
  {
    collection: "Invitations",
    timestamps: true,
  }
);

restAPIConnection.model("Invitation", invitationSchema);

export default restAPIConnection.model<InvitationDocument, InvitationModel>(
  "Invitation"
);
