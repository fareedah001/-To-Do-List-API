import { config } from "dotenv";
config();

import express from "express";
import mongoose from "mongoose";
import { Login, Register } from "./Controllers/authController.js";

let uri = process.env.DB_URI;

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(uri);

// const User = require("./models/user"); // Import the User model
// const Task = require("./models/task"); // Import the User model

// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }));

// Define a route for the home page
// app.get('/', (req, res) => {
//     res.send('Hello, World!');
// });

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post(
  "/login",
  //   (req, res) => {
  //   const { email, password } = req.body;

  //   // Handle the data (e.g., validation, authentication)
  //   if (!email || !password) {
  //     return res
  //       .status(400)
  //       .json({ message: "Email and password are required." });
  //   }

  //   // Example response - in a real app, you'd check the credentials against a database
  //   return res.status(200).json({ message: "Login successful!" });

  //   return res.status(401).json({ message: "Invalid email or password." });
  // }
  Login
);

app.post(
  "/register",

  Register
);

// Get a list of tasks and filter them by status
// app.get("/tasks", async (req, res) => {
//   const { status } = req.query; // Get status from query parameters

//   try {
//     // Create a filter based on the query parameter
//     let filter = {};
//     if (status) {
//       filter.status = status; // Apply filter if 'status' query param is present
//     }

//     const tasks = await Task.find(filter); // Fetch tasks based on the filter

//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching tasks", error });
//   }
// });

// // Update Task Status by ID
// app.put("/tasks/:id", async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;

//   try {
//     const updatedTask = await Task.findByIdAndUpdate(
//       id,
//       { status },
//       { new: true } // Returns the updated document
//     );

//     if (!updatedTask) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     res.status(200).json(updatedTask);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating task", error });
//   }
// });

// // Delete Task by ID
// app.delete("/tasks/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deletedTask = await Task.findByIdAndDelete(id);

//     if (!deletedTask) {
//       return res.status(404).json({ message: "Task not found" });
//     }

//     res.status(200).json({ message: "Task deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting task", error });
//   }
// });

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});
