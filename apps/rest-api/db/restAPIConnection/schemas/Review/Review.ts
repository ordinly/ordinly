import mongoose from "mongoose";

import restAPIConnection from "@db/restAPIConnection";

import type { Document, Model } from "mongoose";

import type { Review } from "./types";

const { Schema } = mongoose;

interface ReviewDocument extends Document, Review {}

interface ReviewModel extends Model<ReviewDocument> {}

const reviewSchema = new Schema<ReviewDocument>(
  {
    userId: String,
    companyId: String,
    details: String,
    rating: Number,
    title: String,
  },
  {
    collection: "Reviews",
    timestamps: true,
  }
);

//@ts-ignore
restAPIConnection.model("Review", reviewSchema);

//@ts-ignore
export default restAPIConnection.model<ReviewDocument, ReviewModel>("Review");
