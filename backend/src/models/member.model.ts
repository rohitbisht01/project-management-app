import mongoose from "mongoose";
import { RoleDocument } from "./roles-permission.model";

export interface MemberDocument extends Document {
  userId: mongoose.Types.ObjectId;
  workspaceId: mongoose.Types.ObjectId;
  role: RoleDocument;
  joinedAt: Date;
}

const memberSchema = new mongoose.Schema<MemberDocument>(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.ObjectId,
      ref: "Workspace",
      required: true,
    },
    role: {
      type: mongoose.Schema.ObjectId,
      ref: "Role",
      required: true,
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const MemberModel = mongoose.model<MemberDocument>("Member", memberSchema);
export default MemberModel;
