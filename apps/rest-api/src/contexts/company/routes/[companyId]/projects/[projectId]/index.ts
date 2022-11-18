import express from "express";

import {
  getCompanyProject,
  updateCompanyProjectDetails,
  deleteCompanyProject,
} from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req: any, res) => {
    try {
      const {
        params: { companyId, projectId },
        //@ts-ignore
        user,
      } = req;

      const { status, message, project } = await getCompanyProject({
        userId: user._id,
        companyId,
        projectId,
      });

      res.status(status).send({ message, project });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .put(async (req: any, res) => {
    try {
      const {
        params: { companyId, projectId },
        //@ts-ignore
        user,
        body: {
          name,
          description,
          priority,
          status: projectStatus,
          startDate,
          dueDate,
          clientId,
        },
      } = req;

      const { status, message } = await updateCompanyProjectDetails({
        userId: user._id,
        projectId,
        companyId,
        name,
        description,
        priority,
        status: projectStatus,
        startDate,
        dueDate,
        clientId,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .delete(async (req: any, res) => {
    try {
      const {
        params: { companyId, projectId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await deleteCompanyProject({
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
