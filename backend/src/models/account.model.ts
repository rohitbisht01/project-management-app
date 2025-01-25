import mongoose from "mongoose";
import { ProviderEnum } from "../enums/account-provider.enum";

export interface AccountDocument extends Document {
  provider: ProviderEnum;
  providerId: string; // emial id, google id, facebook id
  userId: mongoose.Types.ObjectId;
  refreshToken: string | null;
  tokenExpiry: Date | null;
  createdAt: Date;
}

const accountSchema = new mongoose.Schema<AccountDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: Object.values(ProviderEnum),
      required: true,
    },
    providerId: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    tokenExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.refreshToken;
      },
    },
  }
);

const AccountModel = mongoose.model<AccountDocument>("Account", accountSchema);
export default AccountModel;
