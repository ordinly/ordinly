import mongoose from "mongoose";

import schedulerAPIConnection from "@db/schedulerAPIConnection";

import type { EventDocument, EventModel } from "./types";

const { Schema } = mongoose;

const eventSchema = new Schema<EventDocument>(
  {
    start: Date,
    end: Date,
    name: String,
    description: String,
    userId: String,
    companyId: String,
    projectID: String,
    taskId: String,
    googleEventId: String,
    lastNotification: String,
  },
  { collection: "Events" }
);

schedulerAPIConnection.model("Event", eventSchema);

export default schedulerAPIConnection.model<EventDocument, EventModel>("Event");
