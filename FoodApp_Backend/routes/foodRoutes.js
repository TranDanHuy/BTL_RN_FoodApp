import express from "express";
import { getFoods, addFood } from "../controllers/foodController.js";

const router = express.Router();

// ✅ Lấy danh sách món ăn
router.get("/", getFoods);

// ✅ Thêm món ăn mới
router.post("/", addFood);

export default router;
