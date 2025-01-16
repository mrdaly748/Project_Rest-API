const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/User");

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    err ? console.log(error) : console.log(`Server is running on port ${PORT}`)
})
// Connect to the database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection failed:", err));

         // Routes

// GET: Return all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

// POST: Add a new user
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(400).json({ error: "Unable to create user" });
  }
});

// PUT: Edit a user by ID
app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User updated", user: updatedUser });
  } catch (err) {
    res.status(400).json({ error: "Unable to update user" });
  }
});

// DELETE: Remove a user by ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted", user: deletedUser });
  } catch (err) {
    res.status(400).json({ error: "Unable to delete user" });
  }
});


