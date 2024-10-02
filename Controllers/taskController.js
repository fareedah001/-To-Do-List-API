import Task from "../models/task.js";
import jwt from "jsonwebtoken";

// Route to create a task (only for authenticated users)
export const CreateTask = async (req, res) => {
  try {
    console.log(req.payload);

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.payload.userId,
    });

    res.status(201).json({ data: task });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const GetAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.payload.userId });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const GetTask = async (req, res) => {
  try {
    const id = req.params.id;
    const tasks = await Task.findOne({ _id: id, userId: req.payload.userId });

    res.status(200).json({ data: tasks });
  } catch (error) {
    res.status(400).send(error);
  }
};

// // Update a specific task by its ID
// router.patch('/tasks/:id', async (req, res) => {
//   const updates = Object.keys(req.body);  // Get the fields to update
//   const allowedUpdates = ['title', 'description', 'completed']; // Fields that can be updated
//   // const isValidOperation = updates.every(update => allowedUpdates.includes(update)

export const EditTask = async (req, res) => {
  try {
    const id = req.params.id;

    // console.log(id);

    // const tasks = await Task.findOne({ _id: id, userId: req.payload.userId });
    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated task
      runValidators: true, // Ensure the updates adhere to the schema
    });
    // console.log(task);
    res.status(200).json({ data: task });
  } catch (error) {
    res.status(400).send(error);
  }
};
