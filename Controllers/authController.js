// import crypto from "crypto";
// import { promisify } from "util";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import User from "../models/user.js";

import Task from "../models/task.js";

export async function Register(req, res) {
  const { email, password } = req.body; // Destructure email and password from req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Invalid email" });
  }

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword, // Save the hashed password
    });

    await newUser.save(); // Save the user in the database

    // Return success response
    res
      .status(201)
      .json({ message: "User registered successfully", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user", error });
  }
}

export async function Login(req, res) {
  // Get the email and password from the req body
  const { email, password } = req.body; // Destructure email and password from req.body

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    return res.status(400).json({ message: "This email does not exists" });
  }

  const isPassword = await bcrypt.compare(password, existingUser.password); // You can now use email and password for further logic
  if (!isPassword) {
    return res
      .status(400)
      .json({ message: "This email or password is incorrect" });
  }

  //
  const token = jwt.sign(
    // Payload
    { email: existingUser.email, userId: existingUser._id },
    "secretKey"
  );

  res.status(200).json({ message: "Login successful", data: { email, token } });

  // Fetch the corresponding data from the database using the email
  // If the data exists
  // Log them in
  // Return the data back to the user
  // Else
  // Return an error
  // res.send(200);
}
