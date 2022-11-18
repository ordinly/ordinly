import mongoose from "mongoose";

import { Company } from "@db/restAPIConnection/schemas/Company";
import { Project } from "@db/restAPIConnection/schemas/Project";

import inviteCompanyToCompanyProject from "./companies/inviteCompanyToCompanyProject";

import type { UserDocument } from "@db/restAPIConnection/schemas/User";

import type { APIResponse } from "@contexts/shared/types";

type CreateProjectProps = {
  companyId: string;
  name: string;
  description: string;
  user: UserDocument;
  status: string;
  priority: string;
  startDate: Date;
  dueDate: Date;
  invitations: {
    companyId: string;
    permissions: {
      companies: {
        add: boolean;
        edit: boolean;
        remove: boolean;
        view: boolean;
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
  }[];
  clientId: string;
};

export default async ({
  name,
  description,
  status,
  priority,
  startDate,
  dueDate,
  user,
  companyId,
  invitations,
  clientId,
}: CreateProjectProps): APIResponse => {
  try {
    const company = await Company.findOne({ _id: companyId });

    if (!company) {
      throw {
        status: 404,
        error: "Company not found",
      };
    }

    const client = clientId
      ? company.clients.find(({ _id }) => _id?.toString() === clientId)
      : undefined;

    if (clientId && !client) {
      throw {
        status: 404,
        error: "Client not found",
      };
    }

    const project = await Project.create({
      name,
      description: description ? JSON.stringify(description) : undefined,
      status,
      priority,
      startDate,
      dueDate,
      owner: { companyId: mongoose.Types.ObjectId(companyId) },
      companies: [
        {
          companyId,
          addedOn: new Date(),
          addedBy: {
            userId: user._id,
            companyId: mongoose.Types.ObjectId(companyId),
          },
        },
      ],
      createdBy: user._id,
    });

    if (!company.projects) {
      company.projects = [];
    }

    company.projects.push({ projectId: project._id, clientId });

    if (invitations?.length) {
      await inviteCompanyToCompanyProject({
        user,
        companyId,
        projectId: project._id,
        invitations,
      });
    }

    await company.save();

    return { status: 201, message: "Project created" };
  } catch (caught: any) {
    console.log(caught);
    const {
      status = 500,
      error = "There was an error creating this project",
    } = caught;

    throw {
      status: status,
      error: error,
    };
  }
};
