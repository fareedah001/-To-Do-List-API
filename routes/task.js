const express = require("express");
import Task from "../models/task.js";
const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const router = new express.Router();

// Middleware to authenticate users using JWT
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "secretkey");
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

// Route to create a task (only for authenticated users)
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    userId: req.user._id, // Associate task with the logged-in user
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to list all tasks of the logged-in user
router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

export default Task;
