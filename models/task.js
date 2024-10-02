import mongoose from "mongoose";

// Define the Task schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Link the task to a user
});

const Task = mongoose.model("Task", taskSchema);
export default Task;
