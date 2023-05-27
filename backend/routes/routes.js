import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.route("/profile").get(getProfile).put(updateProfile);

export default router;
