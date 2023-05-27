import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import messages from "../utils/messages.js";

//POST /api/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.checkPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      posts: user.posts,
    });
  } else {
    res.status(401);
    throw new Error(messages.INVALID_LOGIN);
  }
});

//POST /api/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, posts } = req.body;

  //check if user exists
  const isFound = await User.findOne({ email });
  if (isFound) {
    res.status(400);
    throw new Error(messages.USER_FOUND_ERROR);
  }

  const user = await User.create({
    name,
    email,
    password,
    posts,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      posts: user.posts,
    });
  } else {
    res.status(400);
    throw new Error(messages.INVALID_USER);
  }
});

//POST /api/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout User" });
});

//GET /api/profile
const getProfile = asyncHandler(async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    posts: req.user.posts,
  });

  res.status(200).json({ message: "Update User Profile" });
});

//PUT /api/profile
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      posts: updatedUser.posts,
    });
  } else {
    res.status(401);
    throw new Error(messages.USER_NOT_FOUND);
  }

  res.status(200).json({ message: "Update User Profile" });
});

export { loginUser, registerUser, logoutUser, getProfile, updateProfile };
