const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statusSchema = new Schema({
  // postId: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: "user" },
  // like: { type: Boolean },
  // dislike: { type: Boolean },
  status: {
    type: String,
    enum: ["pending", "completed"], // Example statuses
    default: "pending",
  },
});

const status = mongoose.model("status", statusSchema);
module.exports = status;
