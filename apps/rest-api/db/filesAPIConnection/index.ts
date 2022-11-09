import mongoose from "mongoose";

const FILES_API_DB_URL: string = process.env["FILES_API_DB_URL"] || "";

console.log("FILES_API_DB_URL: ", FILES_API_DB_URL);

const connection = mongoose.createConnection(FILES_API_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
});

export default connection;
