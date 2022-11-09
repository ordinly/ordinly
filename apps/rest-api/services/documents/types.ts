export type UploadArgs = {
  bucket: (request: Express.Request, file?: any) => string;
  field: string;
  key: (request: Express.Request, file?: any) => string;
};

export type RemoveArgs = {
  bucket: string;
  key: string;
};

export type ExistsArgs = {
  bucket: string;
  key: string;
};
