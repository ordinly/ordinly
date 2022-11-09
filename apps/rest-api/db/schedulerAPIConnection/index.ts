import mongoose from "mongoose";

const SCHEDULER_API_DB_URL: string = process.env["SCHEDULER_API_DB_URL"] || "";

console.log("SCHEDULER_API_DB_URL: ", SCHEDULER_API_DB_URL);

export default mongoose.createConnection(SCHEDULER_API_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
