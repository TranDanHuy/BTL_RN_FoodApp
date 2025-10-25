import express from "express";
import User from "../models/User.js";

import {
  registerUser,
  loginUser,
  verifyAccount, 
    checkVerificationStatus,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi tải danh sách người dùng" });
  }
});

router.get("/verify", verifyAccount); 
router.get("/status", checkVerificationStatus);

export default router;