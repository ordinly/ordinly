import type { Document, Model } from "mongoose";

export interface EventType {
  start: Date;
  end: Date;
  name: string;
  description: string;
  userId: string;
  companyId: string;
  projectID: string;
  taskId: string;
  googleEventId: string;
  lastNotification: Date;
}

export interface EventDocument extends Document, EventType {}

export interface EventModel extends Model<EventDocument> {}
