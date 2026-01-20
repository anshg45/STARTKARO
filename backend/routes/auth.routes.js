import express from "express";
import { signup, login, changePassword } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/change-password", protect, changePassword);

export default router;
