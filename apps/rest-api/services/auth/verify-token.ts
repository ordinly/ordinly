import { User } from "@db/restAPIConnection/schemas/User";

import auth from "./";

import type { RequestHandler } from "express";

export const nonLoggedInRoutes = [
  new RegExp("/api/user/login"),
  new RegExp("/api/user/persistent-login"),
  new RegExp("/api/user/sign-up"),
  new RegExp("/api/user/verify-account"),
  new RegExp("/api/stripe/subscription"),
  new RegExp("/api/stripe/subscription/webhook"),
  new RegExp("/api/company/search"),
  new RegExp("/api/company/.*/profile"),
];

const loginNotRequired = (url: string) => {
  for (let i = 0; i < nonLoggedInRoutes.length; i++) {
    if (nonLoggedInRoutes[i].test(url)) {
      return true;
    }
  }

  return false;
};

const verifyToken: RequestHandler = async (req, res, next) => {
  const {
    signedCookies: { auth: token },
    originalUrl,
  } = req;

  if (loginNotRequired(originalUrl.split("?")[0])) {
    if (token) {
      const verifiedToken = (await auth.verify(token)) as { _id: string };

      if (verifiedToken) {
        //@ts-ignore
        req.user = await User.findOne({ _id: verifiedToken._id });
      }
    }

    next();
  } else if (token) {
    const verifiedToken = (await auth.verify(token)) as { _id: string };

    if (verifiedToken) {
      //@ts-ignore
      req.user = await User.findOne({ _id: verifiedToken._id });

      next();
    } else {
      return res.status(401).send({ error: "Unauthorized" });
    }
  } else {
    console.log(req);
    return res.status(401).send({ error: "Unauthorized" });
  }
};

export default verifyToken;
