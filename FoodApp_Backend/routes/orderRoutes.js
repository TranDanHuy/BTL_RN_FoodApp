import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ POST - tạo đơn hàng mới
router.post("/", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Lỗi tạo đơn hàng", error: err.message });
  }
});

// ✅ GET - lấy tất cả đơn hàng (tuỳ role user)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Lỗi tải danh sách đơn hàng" });
  }
});

export default router;
