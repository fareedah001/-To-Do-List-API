const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Task schema
const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    // trim: true,
  },
  status: {
    // type: String,
    // required: true,
    // unique: true,
    // trim: true,
    // lowercase: true,
    type: String,
    enum: ["pending", "completed"], // Example statuses
    default: "pending",
  },
  user: {
    type: String,
    required: true,
  },
  // Add any additional fields you need
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the User model
const task = mongoose.model("task", taskSchema);

// Export the User model
module.exports = task;
