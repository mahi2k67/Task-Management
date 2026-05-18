import mongoose, { Schema, models } from "mongoose";

const TaskSchema = new Schema(
  {
    title: String,
    description: String,
    status: {
      type: String,
      default: "Pending",
    },
    priority: {
      type: String,
      default: "Medium",
    },
    userId: String,
  },
  { timestamps: true }
);

const Task = models.Task || mongoose.model("Task", TaskSchema);

export default Task;