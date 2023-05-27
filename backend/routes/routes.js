import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(verifyToken, getProfile)
  .put(verifyToken, updateProfile);

export default router;
