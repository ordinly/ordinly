import express from "express";

import mongoose from "mongoose";

import { addTask } from "@contexts/user/actions";

import { uploadMany, parseFormDataToJSON } from "@services/documents";

import randomString from "@util/randomString";
import getUserProjectTasks from "@contexts/user/actions/projects/getUserProjectTasks";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req, res) => {
    try {
      const {
        params: { projectId },
        query = { page: 1, pageSize: 15 },
        //@ts-ignore
        user,
      } = req;

      const { message, status, tasks, total } = await getUserProjectTasks({
        userId: user._id,
        projectId,
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
    async (req, res) => {
      try {
        const {
          params: { projectId, taskId },
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

        const { status, message } = await addTask({
          userId: user._id,
          projectId,
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
