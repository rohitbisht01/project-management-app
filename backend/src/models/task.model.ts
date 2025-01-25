import mongoose, { mongo } from "mongoose";
import {
  TaskPriorityEnum,
  TaskPriorityEnumType,
  TaskStautusEnum,
  TaskStautusEnumType,
} from "../enums/task.enum";
import { generateTaskCode } from "../utils/uuid";

export interface TaskDocument extends Document {
  taskCode: string;
  title: string;
  description: string | null;
  project: mongoose.Types.ObjectId;
  workspace: mongoose.Types.ObjectId;
  status: TaskStautusEnumType;
  priority: TaskPriorityEnumType;
  assignedTo: mongoose.Types.ObjectId;
  createdBy: mongoose.Types.ObjectId;
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new mongoose.Schema<TaskDocument>(
  {
    taskCode: {
      type: String,
      unique: true,
      default: generateTaskCode,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(TaskStautusEnum),
      default: TaskStautusEnum.TODO,
    },
    priority: {
      type: String,
      enum: Object.values(TaskPriorityEnum),
      default: TaskPriorityEnum.MEDIUM,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    dueDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const TaskModel = mongoose.model<TaskDocument>("Task", taskSchema);
export default TaskModel;
