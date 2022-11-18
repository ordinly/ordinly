import { config } from "dotenv";

import "module-alias/register";

import path from "path";
import glob from "fast-glob";

import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { Server } from "socket.io";

import verifyToken, { nonLoggedInRoutes } from "@services/auth/verify-token";

import restAPIConnection from "@db/restAPIConnection";

import type { RequestHandler } from "express";
import type { Socket } from "socket.io";

config();

const NODE_ENV: string = process.env["NODE_ENV"] || "";
const PORT: number = process.env["PORT"] ? parseInt(process.env["PORT"]) : 8080;

const COOKIE_SECRET: string = process.env["COOKIE_SECRET"] || "";

const ENDPOINT_DIR = path.resolve(__dirname, "contexts");

const extension = NODE_ENV === "production" ? ".js" : ".ts";

const app = express();

const regex = /(\[.*?\])/g;

// @ts-ignore
app.use(cookieParser(COOKIE_SECRET));
// @ts-ignore
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

interface ExtendedSocket extends Socket {
  userId?: string;
}

restAPIConnection
  .on("error", (error: any) => {
    console.error(error);
  })
  .once("open", async () => {
    console.log("Database connected");

    const server = createServer(app);

    server.listen(PORT, "0.0.0.0", async () => {
      console.log(`Server online: connected to port ${PORT}`);

      const io = new Server(server);

      // @ts-ignore
      const socketMiddleware = (req, _res, next) => {
        // @ts-ignore
        req.io = io;
        next();
      };

      glob
        .sync(`**/sockets/**/*${extension}`, { cwd: ENDPOINT_DIR })
        .forEach(async (fileName) => {
          console.log(
            `socket: ${fileName.substring(
              fileName.lastIndexOf("/") + 1,
              fileName.length - 3
            )}`
          );
        });

      glob
        .sync(`**/routes/**/*${extension}`, { cwd: ENDPOINT_DIR })
        .forEach(async (fileRoute) => {
          let endpoint = fileRoute.replace("/routes", "");

          endpoint = endpoint.split("/").reduce((total, current) => {
            const value = current.endsWith(extension)
              ? current.substring(0, current.length - extension.length)
              : current;

            if (value === "index") {
              return total;
            }

            const [match] = value.match(regex) || [];

            if (match) {
              return `${total}/:${value.substring(1, value.length - 1)}`;
            }

            return `${total}/${value}`;
          }, "/api");

          const {
            router,
            middleware = [],
          }: {
            router: any;
            middleware: RequestHandler[];
          } = await import(path.resolve(ENDPOINT_DIR, fileRoute));

          // Prints the endpoints and their respective REST methods (GET, PUT, POST, DELETE)
          console.log(
            `${endpoint}: ${Object.keys(router.stack[0].route.methods).reduce(
              (total, current, index) =>
                `${total}${index ? ", " : " "}${current.toUpperCase()}`,
              ""
            )}`
          );

          if (nonLoggedInRoutes.find((regex: any) => regex.test(endpoint))) {
            app.use(endpoint, [...middleware, socketMiddleware], router);
          } else {
            app.use(
              endpoint,
              [verifyToken, ...middleware, socketMiddleware],
              router
            );
          }
        });

      io.on("connection", async (socket: ExtendedSocket) => {
        console.log("A user connected");

        glob
          .sync(`**/sockets/**/*${extension}`, { cwd: ENDPOINT_DIR })
          .forEach(async (fileName) => {
            const { default: handler } = await import(
              path.resolve(__dirname, "contexts", fileName)
            );

            socket.on(
              fileName.substring(
                fileName.lastIndexOf("/") + 1,
                fileName.length - 3
              ),
              (args) => handler({ socket, args, io })
            );
          });
      });
    });
  });
