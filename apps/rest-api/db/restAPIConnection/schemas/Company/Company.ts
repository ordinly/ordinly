import mongoose from "mongoose";

import restAPIConnection from "@db/restAPIConnection";

import type { CompanyDocument, CompanyModel } from "./types";

const { Schema } = mongoose;

const companySchema = new Schema<CompanyDocument>(
  {
    _id: Schema.Types.ObjectId,
    owner: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    createdBy: { type: Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, required: true },
    deletedBy: Schema.Types.ObjectId,
    deletedAt: Date,
    profilePicture: { key: String, name: String },
    profile: {
      tagline: String,
      description: String,
      tags: [String],
      location: {
        country: String,
        region: String,
        city: String,
        streetAddress: String,
      },
    },
    tags: [String],
    subscription: {
      active: Boolean,
      customerId: String,
      subscriptionId: String,
      scheduleId: String,
    },
    address: {
      country: String,
      region: String,
      city: String,
      postalCode: String,
      streetAddress: String,
    },
    workers: [
      {
        _id: Schema.Types.ObjectId,
        userId: String,
        email: String,
        roleId: String,
        status: String,
        joined: Date,
        inactiveAt: Date,
      },
    ],
    vendors: [],
    projects: [
      { projectId: Schema.Types.ObjectId, client: Schema.Types.ObjectId },
    ],
    clients: [
      {
        _id: Schema.Types.ObjectId,
        userId: Schema.Types.ObjectId,
        companyId: Schema.Types.ObjectId,
        name: String,
        description: String,
        priority: String,
        status: String,
        createdAt: Date,
        createdBy: String,
        deletedAt: Date,
        deletedBy: String,
        contacts: [
          {
            _id: Schema.Types.ObjectId,
            name: String,
            description: String,
            email: String,
            phoneNumber: Number,
            notes: [
              {
                _id: Schema.Types.ObjectId,
                userId: String,
                text: String,
                createdDate: Date,
                updatedDate: Date,
                deletedDate: Date,
              },
            ],
            files: [String],
          },
        ],
        address: {
          country: String,
          region: String,
          city: String,
          streetAddress: String,
          postalCode: String,
        },
      },
    ],
    roles: [
      {
        name: { type: String, required: true },
        description: String,
        createdBy: { type: Schema.Types.ObjectId, required: true },
        createdAt: { type: Date, required: true },
        deletedBy: Schema.Types.ObjectId,
        deletedAt: Date,
        permissions: {
          required: true,
          type: {
            settings: {
              invitations: { edit: Boolean },
              profile: {
                edit: Boolean,
              },
              posts: {
                add: Boolean,
                edit: Boolean,
                remove: Boolean,
              },
              priceBook: {
                add: Boolean,
                edit: Boolean,
                remove: Boolean,
              },
              jobPostings: {
                add: Boolean,
                edit: Boolean,
                remove: Boolean,
              },
            },
            clients: {
              clients: { add: Boolean, edit: Boolean, remove: Boolean },
              contacts: { add: Boolean, edit: Boolean, remove: Boolean },
            },
            projects: {
              projects: {
                add: Boolean,
                assigned: { edit: Boolean, remove: Boolean },
                nonAssigned: { edit: Boolean, remove: Boolean },
              },
              tasks: {
                add: Boolean,
                assigned: { edit: Boolean, remove: Boolean },
                nonAssigned: { edit: Boolean, remove: Boolean },
              },
              companies: {
                add: Boolean,
                edit: Boolean,
                remove: Boolean,
              },
            },
            people: {
              workers: { add: Boolean, edit: Boolean, remove: Boolean },
              teams: {
                add: Boolean,
                assigned: { edit: Boolean },
                nonAssigned: { edit: Boolean },
                remove: Boolean,
              },
              roles: { add: Boolean, edit: Boolean, remove: Boolean },
            },
          },
        },
      },
    ],
    teams: [
      {
        name: { type: String, required: true },
        description: String,
        createdBy: { type: Schema.Types.ObjectId, required: true },
        createdAt: { type: Date, required: true },
        deletedBy: Schema.Types.ObjectId,
        deletedAt: Date,
        members: [Schema.Types.ObjectId],
      },
    ],
    careers: [
      {
        title: String,
        description: String,
        payRange: { from: Number, to: Number },
      },
    ],
  },
  { collection: "Companies" }
);

//@ts-ignore
restAPIConnection.model("Company", companySchema);

//@ts-ignore
export default restAPIConnection.model<CompanyDocument, CompanyModel>(
  "Company"
);
