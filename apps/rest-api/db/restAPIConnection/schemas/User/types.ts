import type { Document, Model } from "mongoose";

export interface UserType {
  name: string;
  email: string;
  phone?: number;
  password: string;
  accountType: string;
  public: boolean;
  verified: boolean;
  verificationCode: string;
  companies: string[];
  projects: string[];
  profile?: {
    description: string;
    phone?: string;
    email?: string;
    profilePicture?: string;
    coverPicture?: string;
    displayName?: string;
    website?: string;
    address?: string;
  };
  integrations: {
    google: {
      code: string;
      scope: string[];
      accessToken: string;
      refreshToken: string;
      mail: boolean;
      calendar: { syncedCalendars: string[] };
    };
  };
}

export interface UserDocument extends Document, UserType {}

export interface UserModel extends Model<UserDocument> {}
