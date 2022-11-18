import express from "express";

import { getSingle } from "@services/documents";

const router = express.Router({ mergeParams: true });

router.route("/").get(async (req: any, res) => {
  try {
    const {
      params: { companyId, invoiceKey },
    } = req;

    const response = await getSingle({
      bucket: "invoices",
      key: `/${companyId}/${invoiceKey}`,
    });

    if (response?.Body) {
      res.writeHead(200, { "Content-Type": "application/pdf" });
      res.end(response?.Body);
    } else {
      throw { status: 404, error: "File not found" };
    }
  } catch (caught: any) {
    console.error(caught);
    const { status = 500, error } = caught;

    res.status(status).send({ error });
  }
});
export { router };
