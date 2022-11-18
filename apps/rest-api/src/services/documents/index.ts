import { config } from "dotenv";

import fs from "fs";
import path from "path";

import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

import type { UploadArgs, RemoveArgs, ExistsArgs } from "./types";

config();

const OBJECT_STORAGE_URL: string = process.env["OBJECT_STORAGE_URL"] || "";

const OBJECT_STORAGE_ACCESS_KEY: string =
  process.env["OBJECT_STORAGE_ACCESS_KEY"] || "";

const OBJECT_STORAGE_SECRET_KEY: string =
  process.env["OBJECT_STORAGE_SECRET_KEY"] || "";

const endpoint = new aws.Endpoint(OBJECT_STORAGE_URL);

export const s3 = new aws.S3({
  endpoint,
  accessKeyId: OBJECT_STORAGE_ACCESS_KEY,
  secretAccessKey: OBJECT_STORAGE_SECRET_KEY,
  s3ForcePathStyle: true,
});

s3.listBuckets((listBucketError: any, data: any) => {
  if (listBucketError) {
    console.log("Error", listBucketError);
  } else {
    console.log("Buckets: ", data.Buckets);

    if (
      !data.Buckets?.find(({ Name }: { Name: string }) => Name === "projects")
    ) {
      s3.createBucket(
        {
          Bucket: "projects",
        },
        (createBucketError: any, data: any) => {
          if (createBucketError) {
            console.log(createBucketError, createBucketError.stack);
          } else {
            console.log(data);
          }
        }
      );
    }

    if (
      !data.Buckets?.find(({ Name }: { Name: string }) => Name === "companies")
    ) {
      s3.createBucket(
        {
          Bucket: "companies",
        },
        (createBucketError: any, data: any) => {
          if (createBucketError) {
            console.log(createBucketError, createBucketError.stack);
          } else {
            console.log(data);
          }
        }
      );
    }

    if (
      !data.Buckets?.find(({ Name }: { Name: string }) => Name === "invoices")
    ) {
      s3.createBucket(
        {
          Bucket: "invoices",
        },
        (createBucketError: any, data: any) => {
          if (createBucketError) {
            console.log(createBucketError, createBucketError.stack);
          } else {
            console.log(data);
          }
        }
      );
    }

    if (
      !data.Buckets?.find(({ Name }: { Name: string }) => Name === "quotes")
    ) {
      s3.createBucket(
        {
          Bucket: "quotes",
        },
        (createBucketError: any, data: any) => {
          if (createBucketError) {
            console.log(createBucketError, createBucketError.stack);
          } else {
            console.log(data);
          }
        }
      );
    }

    if (
      !data.Buckets?.find(
        ({ Name }: { Name: string }) => Name === "profile-pictures"
      )
    ) {
      s3.createBucket(
        {
          Bucket: "profile-pictures",
        },
        (createBucketError: any, data: any) => {
          if (createBucketError) {
            console.log(createBucketError, createBucketError.stack);
          } else {
            console.log(data);
          }
        }
      );
    }
  }
});

const exists = async ({ bucket, key }: ExistsArgs) => {
  try {
    await s3.headObject({ Bucket: bucket, Key: key }).promise();

    return true;
  } catch (caught: any) {
    return false;
  }
};

const uploadSingle = ({ bucket, field, key }: UploadArgs) => {
  const upload = multer({
    storage: multerS3({
      s3,
      //@ts-ignore
      bucket: (request, file, callback) => {
        callback(null, bucket(request, file));
      },
      //@ts-ignore
      key: function (request, file, callback) {
        callback(null, key(request, file));
      },
    }),
  }).single(field);

  //@ts-ignore
  return (req, res, next) => {
    //@ts-ignore
    upload(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error("Multer error: ", error);
      } else if (error) {
        // An unknown error occurred when uploading.
        console.error("Unknown upload error: ", error);
      }

      console.log("File uploaded!");

      next();
    });
  };
};

const uploadMany = ({ bucket, field, key }: UploadArgs) => {
  const upload = multer({
    storage: multerS3({
      s3,
      //@ts-ignore
      bucket: (request, file, callback) => {
        callback(null, bucket(request, file));
      },
      //@ts-ignore
      key: function (request, file, callback) {
        callback(null, key(request, file));
      },
    }),
  }).array(field);

  //@ts-ignore
  return (req, res, next) => {
    //@ts-ignore
    upload(req, res, (error) => {
      if (error instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        console.error("Multer error: ", error);
      } else if (error) {
        // An unknown error occurred when uploading.
        console.error("Unknown upload error: ", error);
      }

      console.log("Files uploaded!");

      next();
    });
  };
};

const removeSingle = async ({ bucket, key }: RemoveArgs) => {
  if (await exists({ bucket, key })) {
    await s3.deleteObject({ Bucket: bucket, Key: key }).promise();
  }
};

const getSingle = async ({ bucket, key }: RemoveArgs) => {
  if (await exists({ bucket, key })) {
    return await s3.getObject({ Bucket: bucket, Key: key }).promise();
  } else {
    const value = await fs.readFileSync(
      path.join(__dirname, "../../static/no-photo-available.png")
    );

    return { Body: value };
  }
};

const isJsonString = (test: string) => {
  try {
    JSON.parse(test);
  } catch (e) {
    return false;
  }
  return true;
};

//@ts-ignore
const parseFormDataToJSON = (req, res, next) => {
  const { body } = req;

  Object.entries(body).forEach(([key, value]: [string, any]) => {
    if (isJsonString(value)) {
      req.body[key] = JSON.parse(value);
    }
  });

  next();
};

export {
  getSingle,
  uploadSingle,
  uploadMany,
  removeSingle,
  parseFormDataToJSON,
};
