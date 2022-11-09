import mongoose from "mongoose";

import restAPIConnection from "@db/restAPIConnection";

import type { UserDocument, UserModel } from "./types";

const { Schema } = mongoose;

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumbers: [String],
    password: String,
    verified: { type: Boolean, default: false },
    verificationCode: String,
    companies: [Schema.Types.ObjectId],
    projects: [Schema.Types.ObjectId],
  },
  { collection: "Users" }
);

restAPIConnection.model("User", userSchema);

export default restAPIConnection.model<UserDocument, UserModel>("User");
