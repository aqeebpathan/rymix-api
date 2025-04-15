import { Router } from "express";
import {
  login,
  signup,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuthStatus,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/status", protectRoute, checkAuthStatus);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
