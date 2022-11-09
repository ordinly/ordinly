import express from "express";

import {
  updateRole,
  removeRole,
  getCompanyRole,
} from "@contexts/company/actions";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(async (req: any, res) => {
    try {
      const {
        params: { companyId, roleId },
        //@ts-ignore
        user,
      } = req;

      const { status, message, role } = await getCompanyRole({
        roleId,
        companyId,
        userId: user._id,
      });

      res.status(status).send({ message, role });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  })
  .put(async (req: any, res) => {
    try {
      const {
        params: { companyId, roleId },
        body: { permissions, name, description },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await updateRole({
        roleId,
        companyId,
        permissions,
        name,
        description,
        userId: user._id,
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
        params: { companyId, roleId },
        //@ts-ignore
        user,
      } = req;

      const { status, message } = await removeRole({
        roleId,
        companyId,
        userId: user._id,
      });

      res.status(status).send({ message });
    } catch (caught: any) {
      const { status, error } = caught;

      res.status(status).send({ error });
    }
  });

export { router };
