import asyncHandler from "express-async-handler";
import User from "../models/user.js";

//POST /api/login
const loginUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Auth User" });
});

//POST /api/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, posts } = req.body;

  //check if user exists
  const isFound = await User.findOne({ email });
  if (isFound) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    posts,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      posts: user.posts,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

//POST /api/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout User" });
});

//POST /api/profile
const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User Profile" });
});

//POST /api/profile
const updateProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update User Profile" });
});

export { loginUser, registerUser, logoutUser, getProfile, updateProfile };
