import express from "express";

import {
  getCompanyProjectTask,
  updateCompanyProjectTask,
  deleteCompanyProjectTask,
} from "@contexts/company/actions";

import { uploadMany, parseFormDataToJSON } from "@services/documents";

import randomString from "@util/randomString";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req: any, res) => {
    try {
      const {
        params: { projectId, taskId, companyId },
        //@ts-ignore
        user,
      } = req;

      const { message, status, task } = await getCompanyProjectTask({
        userId: user._id,
        projectId,
        taskId,
        companyId,
      });

      console.log("TASK", task);

      return res.status(status).send({ message, task });
    } catch (caught: any) {
      console.log(caught);
      const {
        status = 500,
        error = "There was an error fetching these tasks",
      } = caught;

      res.status(status).send({ error });
    }
  })
  .put(
    uploadMany({
      field: "newFiles",
      bucket: () => "projects",
      //@ts-ignore - params does exist on this object
      key: ({ params }) => {
        return `/${params.projectId}/tasks/${params.taskId}/${randomString({
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
            existingFiles = [],
            assignedCompany,
            assignedTeam,
            assignedWorker,
            checklist = [],
            relationships = [],
          },
          files,
        } = req;

        const { status, message } = await updateCompanyProjectTask({
          taskId,
          userId: user._id,
          projectId,
          companyId,
          name,
          description,
          dueDate,
          comments,
          existingFiles,
          files: files as any,
          startDate,
          priority,
          status: taskStatus,
          assignedCompany,
          assignedTeam,
          assignedWorker,
          checklist,
          relationships,
        });

        res.status(status).send({ message });
      } catch (caught: any) {
        const { status, error } = caught;

        res.status(status).send({ error });
      }
    }
  )
  .delete(async (req: any, res) => {
    try {
      const {
        params: { projectId, taskId, companyId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await deleteCompanyProjectTask({
        taskId,
        userId: user._id,
        companyId,
        projectId,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
