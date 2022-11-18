import express from "express";

import mongoose from "mongoose";

import {
  createCompanyProjectTask,
  getCompanyProjectTasks,
} from "@contexts/company/actions";

import { uploadMany, parseFormDataToJSON } from "@services/documents";

import randomString from "@util/randomString";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req: any, res) => {
    try {
      const {
        params: { projectId, companyId },
        query = { page: 1, pageSize: 15 },
        //@ts-ignore
        user,
      } = req;

      const { message, status, tasks, total } = await getCompanyProjectTasks({
        userId: user._id,
        projectId,
        companyId,
        ...query,
      });

      return res.status(status).send({ message, tasks, total });
    } catch (caught: any) {
      const {
        status = 500,
        error = "There was an error fetching these tasks",
      } = caught;

      res.status(status).send({ error });
    }
  })
  .post(
    uploadMany({
      field: "files",
      bucket: () => "projects",
      //@ts-ignore - params does exist on this object
      key: ({ params }) => {
        const taskId = mongoose.Types.ObjectId().toString();

        params["taskId"] = taskId;

        return `/${params.projectId}/tasks/${taskId}/files/${randomString({
          length: 15,
        })}`;
      },
    }),
    parseFormDataToJSON,
    async (req: any, res) => {
      try {
        const {
          params: { projectId, taskId, companyId },
          //@ts-ignore
          user,
          body: {
            name,
            dueDate,
            description,
            startDate,
            priority,
            status: taskStatus,
            comments = [],
            assignedCompany,
            checklist = [],
            relationships = [],
          },
          files,
        } = req;

        const { status, message } = await createCompanyProjectTask({
          userId: user._id,
          projectId,
          companyId,
          name,
          description,
          dueDate,
          comments,
          taskId,
          files: files as any,
          startDate,
          priority,
          status: taskStatus,
          assignedCompany,
          checklist,
          relationships,
        });

        res.status(status).send({ message });
      } catch (caught: any) {
        const { status, error } = caught;

        res.status(status).send({ error });
      }
    }
  );

export { router };
