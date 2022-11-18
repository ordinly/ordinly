import mongoose from "mongoose";

const REST_API_DB_URL: string = process.env["REST_API_DB_URL"] || "";

console.log("REST_API_DB_URL: ", REST_API_DB_URL);

const connection = mongoose.createConnection(REST_API_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default connection;
