import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import { Login, Register } from "./Controllers/authController.js";
import {
  CreateTask,
  GetAllTasks,
  GetTask,
  EditTask,
} from "./Controllers/taskController.js";
import { authMiddleware } from "./middleware/auth.js";

let uri = process.env.DB_URI;

const app = express();
app.use(express.json());

// Connect to MongoDB
// mongoose.connect(uri);

const connectedToDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log(`DB connceted`);
  } catch (error) {
    console.log(error);
  }
};
connectedToDB();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/login", Login);

app.post("/register", Register);

// TASK ENDPOINTS
app.post("/task", authMiddleware, CreateTask);
app.get("/tasks", authMiddleware, GetAllTasks);
app.get("/tasks/:id", authMiddleware, GetTask);
app.patch("/task/:id", authMiddleware, EditTask);

// Middleware to parse incoming requests
app.use(express.json());

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
